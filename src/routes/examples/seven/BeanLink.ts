import moment from 'moment';
import { getContext, setContext } from 'svelte';

export type BeanLinkEvent<T> = {
    name:string,
    value:T,
}

export type BeanLinkEventHandler<T> = (event:BeanLinkEvent<T>) => void;

export const createEvent = <T>(name:string, value:T) => ({name, value});

type ContextInitCallback = (beanLink:BeanLink) => void;

export class BeanLink {
    
    private _name:string;
    private _handlers:Map<string, BeanLinkEventHandler<any>[]> = new Map();
    private static featureMap:Map<string, ContextInitCallback[]> = new Map();
    
    private constructor(name:string) {
        this._name = name;
    }

    public static registerFeature(context:string, feature:string, initCallback:ContextInitCallback) {
        let features = BeanLink.featureMap.get(context);
        if (!features) {
            features = [];
            BeanLink.featureMap.set(context, features);
        }
        features.push(initCallback);
        BeanLink.log('register feature', 'context = ' + context + ', feature = '+feature);
    }

    private static initialiseFeatures(context:string, beanLinkInstance:BeanLink) {
        const contextInitCallbacks = BeanLink.featureMap.get(context);
        contextInitCallbacks && contextInitCallbacks.forEach(cb => {
            cb(beanLinkInstance);
        });
    }

    public static getInstance(contextId?:string) {
        let beanLink = getContext('beanLink') as BeanLink;
        let parentBeanLink:BeanLink = beanLink;
        if (!beanLink || (contextId && (contextId !== beanLink.name))) {
            if (contextId) {
                beanLink = new BeanLink(contextId);
                // TODO dont give access to actual context instances, as there maybe more for a given context id
                // here we need to hand out a broadcaster instance 
                // (if there's none for 'contextId' create and save it, hand it out every time the same context is created)
                // The broadcaster will have access to all the context instances
                // We will need to address removing old instances in a separate go
                BeanLink.initialiseFeatures(contextId, beanLink);
            } else {
                throw new Error('Assumed beanLink in context where none exists - with no ID provided, none can be created either.');
            }
            parentBeanLink = getContext('beanLink');
            setContext('beanLink', beanLink);
            setContext('parentBeanLink', parentBeanLink);
        } else if (beanLink) {
            parentBeanLink = getContext('parentBeanLink');
        }
        return {
            beanLink,
            parentBeanLink
        }
    }

    get name() {
        return this._name;
    }

    public publish<T>(event:BeanLinkEvent<T>) {
        BeanLink.log('publish start', event.name + ' = ' + JSON.stringify(event.value));
        const handlers = this._handlers.get(event.name);
        if (handlers) {
            handlers.forEach(handler => {
                handler(event);
            });
        }
        BeanLink.log('publish  done', event.name);
    }

    public on<T>(event:BeanLinkEvent<T>, handler:BeanLinkEventHandler<T>): void;
    public on<T>(event:string, handler:BeanLinkEventHandler<T>):void;
    public on<T>(event: string | BeanLinkEvent<T>, handler:BeanLinkEventHandler<T>):void {
        const eventName = typeof event === 'string' ? event : event.name;
        let handlers = this._handlers.get(eventName);
        if (!handlers) {
            handlers = [];
            this._handlers.set(eventName, handlers);
        }
        //this.log('register', 'name='+eventName+', handler='+handler);
        handlers.push(handler);
    }
    
    private static log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}