import moment from 'moment';
import { getContext, setContext } from 'svelte';

export type BeanLinkEvent<T> = {
    name:string,
    value:T,
}

export type BeanLinkEventHandler<T> = (event:BeanLinkEvent<T>) => void;

export const createEvent = <T>(name:string, value:T) => ({name, value});

export class BeanLink {
    
    private _name:string;
    private _handlers:Map<string, WeakRef<BeanLinkEventHandler<any>>[]> = new Map();
    
    private constructor(name:string) {
        this._name = name;
    }

    public static getInstance(contextId?:string) {
        let beanLink = getContext('beanLink') as BeanLink;
        let parentBeanLink:BeanLink = beanLink;
        if (!beanLink || (contextId && (contextId !== beanLink.name))) {
            if (contextId) {
                beanLink = new BeanLink(contextId);
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
        this.log('publish start', event.name + ' = ' + JSON.stringify(event.value));
        const handlers = this._handlers.get(event.name);
        if (handlers) {
            handlers.forEach(handler => {
                handler.deref()!(event);
            });
        }
        this.log('publish  done', event.name);
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
        this.log('register', 'name='+eventName+', handler='+handler);
        handlers.push(new WeakRef(handler));
    }
    
    private log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}