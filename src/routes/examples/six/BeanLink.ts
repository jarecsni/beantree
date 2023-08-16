
import { EventBus, createEventDefinition } from 'ts-bus';
import moment from 'moment';
import type { BusEvent, EventCreatorFn } from 'ts-bus/types';
import { getContext, setContext } from 'svelte';
import { Stack } from './utils/Stack';

type EventHandlerDescription = {
    id:string,
    handleEvent:(e:BusEvent) => void;
}

export type EventSource = [{
    sourceId?:string,
    event:EventCreatorFn<BusEvent>
}];


export const createStateChangeEvent = <T>(name:string) => {
    return createEventDefinition<{name:String, value: T, sourceId: string}>()('state.change.' + name)
}

export const createEvent = <P>(name:string) => {
    return createEventDefinition<P &{sourceId:string}>()(name);
}

export class BeanLink {
    
    private _name:string;
    private static _bus = new EventBus();
    private eventStack = new Stack<string>();
    
    constructor(name:string) {
        this._name = name;
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

    public publishEvent(sourceId:string, event:BusEvent, componentRef?: unknown) {
        const qualified = this._name + '.' + event.type;
        this.log('publish start', sourceId + '/' + qualified);
        this.eventStack.push(sourceId);
        const busEventPayload = {
            ...event,
            type: qualified,
            meta: {
                sourceId
            }
        };
        BeanLink._bus.publish(busEventPayload);
        this.log('publish done', sourceId + '/' + qualified);
        this.eventStack.pop();
    }

    public subscribeToEvent(eventId:string, handlerDescr:EventHandlerDescription) {
        const qualifiedEventName = this._name + '.' + eventId;
        this.log('subscribe', qualifiedEventName);
        BeanLink._bus.subscribe(qualifiedEventName, (event) => {
            this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
            this.checkEventStack(handlerDescr.id);
            handlerDescr.handleEvent(event);
        });
    }

    public subscribe<T extends BusEvent>(event:EventCreatorFn<T>, handlerDescr:EventHandlerDescription) {
        const qualifiedEventName = this._name + '.' + event.eventType;
        this.log('subscribe', qualifiedEventName);
        BeanLink._bus.subscribe(qualifiedEventName, (e) => {
            this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
            this.checkEventStack(handlerDescr.id);
            handlerDescr.handleEvent(e);
        });
    } 

    public subscribeToEventSource<T extends BusEvent>(eventSource:EventSource, handlerDescr:EventHandlerDescription) {
        eventSource.forEach(eventSourceDef => {
            const qualifiedEventName = this._name + '.' + eventSourceDef.event.eventType;
            this.log('subscribe', qualifiedEventName);
                BeanLink._bus.subscribe(qualifiedEventName, (event) => {
                    if (!eventSourceDef.sourceId || (eventSourceDef.sourceId === event.meta!.sourceId)) {
                        this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
                        this.checkEventStack(handlerDescr.id);
                        handlerDescr.handleEvent(event);
                    }
                }
            );
        })
    } 

    checkEventStack(handlerId:string) {
        if (this.eventStack.has(handlerId)) {
            throw new Error('Event handling cycle detected: ' + handlerId);
        }
    }

    private log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}