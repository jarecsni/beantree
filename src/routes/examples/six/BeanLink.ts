import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import { EventBus, createEventDefinition } from "ts-bus";
import moment from 'moment';
import type { BusEvent } from "ts-bus/types";

type EventHandler = (e:BusEvent) => void;

export class BeanLink {
    
    private _name:string;
    private static _bus = new EventBus();;
    private _eventMap:Map<string, string>;
    private static _rootInstance = new BeanLink('__ROOT__');

    constructor(name:string) {
        this._name = name;
        this._eventMap = new Map();
    }

    get name() {
        return this._name;
    }

    static get rootInstance() {
        return BeanLink._rootInstance; 
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

    public mapEvent(from:string, to:string) {
        this._eventMap.set(from, to);
    }

    private log(action:string, message:string) {
        console.log('[beanlink:' + action + '][' + moment().format() + ']:', message);
    }
}