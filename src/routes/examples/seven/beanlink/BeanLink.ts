import moment from 'moment';
import { getContext, setContext } from 'svelte';

export type BeanLinkEvent<T> = {
    name:string,
    value:T,
}

export type BeanLinkEventCreator<T> = {
    name: string,
    event: (value:T) => (BeanLinkEvent<T>)
}

export type BeanLinkEventHandler<T> = (event:BeanLinkEvent<T>) => void;

const eventNames:Map<string, string> = new Map();

export const createEvent = <T>(name:string) => {
    if (eventNames.get(name)) {
        BeanLink.warn('createEvent', 'event name "' + name + '" is being redefined');
    } else {
        eventNames.set(name, name);
    }
    return {
        name,
        event: ((value:T) => ({name, value}))
    };
}

type ContextInitCallback = (beanLink:BeanLinkEventer) => void;

export interface BeanLinkEventer {
    on<T>(event: string | BeanLinkEventCreator<T>, handler:BeanLinkEventHandler<T>):void;
    publish<T>(event:BeanLinkEvent<T>):void;
}

class Multiplexer implements BeanLinkEventer {
    private _context:string;
    constructor(context:string) {
        this._context = context;
    }
    public on<T>(event:BeanLinkEventCreator<T>, handler:BeanLinkEventHandler<T>): void;
    public on<T>(event:string, handler:BeanLinkEventHandler<T>):void;
    public on<T>(event: string | BeanLinkEventCreator<T>, handler:BeanLinkEventHandler<T>):void {
        const blinks = BeanLink.contextInstances.get(this._context);
        blinks?.forEach(beanLink => {
            if (typeof event === 'string') {
                beanLink.on(event as string, handler);
            } else {
                beanLink.on(event as BeanLinkEventCreator<T>, handler);
            }
        });
    }
    public publish<T>(event:BeanLinkEvent<T>) {
        const blinks = BeanLink.contextInstances.get(this._context);
        blinks?.forEach(beanLink => {
            beanLink.publish(event);
        });
    }
}

export class BeanLink {
    
    private _name:string;
    private _handlers:Map<string, BeanLinkEventHandler<any>[]> = new Map();
    private static featureMap:Map<string, ContextInitCallback[]> = new Map();
    static contextInstances:Map<String, BeanLink[]> = new Map();
    
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
        let instancesForContext = BeanLink.contextInstances.get(context);
        if (!instancesForContext) {
            instancesForContext = [];
            BeanLink.contextInstances.set(context, instancesForContext);
        }
        instancesForContext!.push(beanLinkInstance);
        const contextInitCallbacks = BeanLink.featureMap.get(context);
        contextInitCallbacks && contextInitCallbacks.forEach(cb => {
            cb(new Multiplexer(context));
        });
    }

    public static getInstance(contextId?:string) {
        let beanLink = getContext('beanLink') as BeanLink;
        let parentBeanLink:BeanLink = beanLink;
        if (!beanLink || (contextId && (contextId !== beanLink.name))) {
            if (contextId) {
                beanLink = new BeanLink(contextId);
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

    public on<T>(event:BeanLinkEventCreator<T>, handler:BeanLinkEventHandler<T>): void;
    public on<T>(event:string, handler:BeanLinkEventHandler<T>):void;
    public on<T>(event: string | BeanLinkEventCreator<T>, handler:BeanLinkEventHandler<T>):void {
        const eventName = typeof event === 'string' ? event : event.name;
        let handlers = this._handlers.get(eventName);
        if (!handlers) {
            handlers = [];
            this._handlers.set(eventName, handlers);
        }
        //this.log('register', 'name='+eventName+', handler='+handler);
        handlers.push(handler);
    }
    
    static log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
    static warn(action:string, message:string) {
        console.log('[warning - beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}