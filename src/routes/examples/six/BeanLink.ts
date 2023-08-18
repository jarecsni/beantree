
import { EventBus, createEventDefinition } from 'ts-bus';
import moment from 'moment';
import type { BusEvent, EventCreatorFn, SubscriptionDef } from 'ts-bus/types';
import { getContext, setContext } from 'svelte';
import { Stack } from './utils/Stack';
import type { PredicateFn } from 'ts-bus/EventBus';

type EventHandlerDescription = {
    id:string,
    handleEvent:(e:BusEvent) => void;
}

export type EventSource = [{
    event:string,
    sourceId?:string,
    eventCreator?:EventCreator,
    predicate?:Predicate
}];

export type EventCreator = EventCreatorFn<BusEvent>;
export type Predicate = PredicateFn<BusEvent>;

export const createStateChangeEvent = <T>(name:string) => {
    return createEventDefinition<{name:String, value: T, sourceId: string}>()('state.change.' + name)
}

export const createEvent = <P>(name:string) => {
    return createEventDefinition<P &{sourceId:string}>()(name);
}

export class BeanLink {
    
    private _name:string;
    private _bus = new EventBus();
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

    public publishEvent(sourceId:string, event:BusEvent) {
        const qualified = this._name + '.' + event.type;
        this.log('publish start', sourceId + '/' + qualified + '(' + JSON.stringify(event.payload) + ')');
        this.eventStack.push(sourceId);
        const busEventPayload = {
            ...event,
            meta: {
                sourceId
            }
        };
        this._bus.publish(busEventPayload);
        this.log('publish done', sourceId + '/' + qualified);
        this.eventStack.pop();
    }

    public subscribeToEvent(eventId:string, handlerDescr:EventHandlerDescription) {
        const qualifiedEventName = this._name + '.' + eventId;
        this.log('subscribe', 'event = ' + qualifiedEventName + ', handler = ' + handlerDescr.id);
        this._bus.subscribe(eventId, (event) => {
            this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
            //this.checkEventStack(eventId, handlerDescr.id);
            handlerDescr.handleEvent(event);
        });
    }

    public subscribe<T extends BusEvent>(event:EventCreator, handlerDescr:EventHandlerDescription) {
        const qualifiedEventName = this._name + '.' + event.eventType;
        this.log('subscribe', 'event = ' + qualifiedEventName + ', handler = ' + handlerDescr.id);
        this._bus.subscribe(event, (e) => {
            this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
            //this.checkEventStack(event.eventType, handlerDescr.id);
            handlerDescr.handleEvent(e);
        });
    } 

    public subscribeToEventSource<T extends BusEvent>(eventSource:EventSource, handlerDescr:EventHandlerDescription) {
        eventSource.forEach(eventSourceDef => {
            const qualifiedEventName = this._name + '.' + eventSourceDef.event;
            this.log('subscribe', 'event = ' + qualifiedEventName + ', handler = ' + handlerDescr.id);
            const handler = (event:BusEvent) => {
                if (!eventSourceDef.sourceId || (eventSourceDef.sourceId === event.meta!.sourceId)) {
                    this.log('handle event', 'handler: ' + handlerDescr.id + ', event: ' + qualifiedEventName);
                    //this.checkEventStack(eventSourceDef.event + '/' + (eventSourceDef.sourceId && ('/' + eventSourceDef.sourceId) || ''), handlerDescr.id);
                    handlerDescr.handleEvent(event);
                }
            };
            // TODO look into the typing side of this as this is a bit silly
            // I wanted to specify 'event' as SubscriptionDefinition which is clearly
            // an existing overload in EventBus, but it didn't work - not sure why?
            if (eventSourceDef.predicate) {
                this._bus.subscribe(eventSourceDef.predicate, handler);
            } else if (eventSourceDef.eventCreator) {
                this._bus.subscribe(eventSourceDef.eventCreator, handler);
            } else if (eventSourceDef.event) {
                this._bus.subscribe(eventSourceDef.event, handler);
            } else {
                throw Error('You need to specify one of "event", "eventCreator" or "predicate" for your eventsource');
            }
        })
    } 

    checkEventStack(sourceId:string, handlerId:string) {
        if (this.eventStack.has(handlerId)) {
            this.eventStack.clear();
            throw new Error('Event handling cycle detected! Source id = ' + sourceId + ', handler id = ' + handlerId);
        }
    }

    private log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}