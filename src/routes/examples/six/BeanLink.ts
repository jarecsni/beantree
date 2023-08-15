
import { EventBus, createEventDefinition } from "ts-bus";
import moment from 'moment';
import type { BusEvent, EventCreatorFn } from "ts-bus/types";
import { getContext, setContext } from "svelte";

type EventHandler = (e:BusEvent) => void;

export const createStateChangeEvent = <T>(name:string) => {
    return createEventDefinition<{name:String, value: T, sourceId: string}>()('state.change.' + name)
}

export const createEvent = <P>(name:string) => {
    return createEventDefinition<P &{sourceId:string}>()(name);
}

export class BeanLink {
    
    private _name:string;
    private static _bus = new EventBus();;
    private _eventMap:Map<string, string>;
    
    constructor(name:string) {
        this._name = name;
        this._eventMap = new Map();
    }

    public static getInstanceInContext(contextId?:string):BeanLink {
        let instance = getContext('beanLink') as BeanLink;
        if (!instance || (contextId && (contextId !== instance.name))) {
            if (contextId) {
                instance = new BeanLink(contextId);
            } else {
                throw new Error('Assumed beanLink in context where none exists - with no ID provided, none can be created either.');
            }
            const parentInstance = getContext('beanLink');
            if (parentInstance) {
                setContext('parentBeanLink', parentInstance);
            }
            setContext('beanLink', instance);
        }
        return instance;
    }

    public static getInstanceInParentContext():BeanLink {
        let parentInstance = getContext('parentBeanLink') as BeanLink;
        if (!parentInstance) {
            parentInstance = getContext('beanLink');
            setContext('parentBeanLink', parentInstance);
        }
        return getContext('parentBeanLink');
    }

    get name() {
        return this._name;
    }

    public publishEvent(sourceId:string, event:BusEvent) {
        const mapped = this._name + '.' + (this._eventMap.get(event.type) || event.type);
        const typeInfo = event.type !== mapped ? mapped + '(' + event.type + ')' : mapped;
        this.log('publish', sourceId + '/' + typeInfo + '(' + JSON.stringify(event.payload) + ')');
        const busEventPayload = {
            ...event,
            type: mapped
        };
        BeanLink._bus.publish(busEventPayload);
    }

    public subscribeToEvent(eventId:string, handler:EventHandler) {
        const qualifiedEventName = this._name + '.' + eventId;
        this.log('subscribe', qualifiedEventName);
        BeanLink._bus.subscribe(qualifiedEventName, (event) => {
            handler(event);
        });
    }

    public subscribe<T extends BusEvent>(event:EventCreatorFn<T>, handler:EventHandler) {
        const mapped = this._name + '.' + (this._eventMap.get(event.eventType) || event.eventType);
        event.eventType = mapped;
        BeanLink._bus.subscribe(event, (event) => {
            handler(event);
        });
    } 

    public mapEvent(from:string, to:string) {
        this._eventMap.set(from, to);
    }

    private log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}