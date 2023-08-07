import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import { EventBus, createEventDefinition } from "ts-bus";
import moment from 'moment';

type EventHandler = (payload:KVType) => void;

export class BeanLink {
    
    private _name:string;
    private _bus:EventBus;
    private _eventMap:Map<string, string>;
    private static _rootInstance = new BeanLink('__ROOT__');

    constructor(name:string) {
        this._name = name;
        this._bus = new EventBus();
        this._eventMap = new Map();
    }

    get name() {
        return this._name;
    }

    static get rootInstance() {
        return BeanLink._rootInstance; 
    }

    public publishEvent(sourceId:string, eventId:string, payload:unknown) {
        const mapped = this._eventMap.get(eventId) || eventId;
        console.log('[beanlink:publish][' + moment().format() + ']: ' + sourceId + '/' + eventId + '(' + JSON.stringify(payload) + ')');
        const busEventPayload = {
            type: mapped,
            payload
        };
        this._bus.publish(busEventPayload);
        BeanLink._rootInstance._bus.publish(busEventPayload);
    }

    public subscribeToEvent(eventId:string, handler:EventHandler) {
        this._bus.subscribe(eventId, (event) => {
            handler({payload: event.payload});
        });
    }

    public mapEvent(from:string, to:string) {
        this._eventMap.set(from, to);
    }
}