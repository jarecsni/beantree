import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import { EventBus, createEventDefinition } from "ts-bus";

type StateChangeHandler = (payload:KVType) => void;

export class BeanLink {
    
    private _name:string;
    private _bus:EventBus;
    private _eventMap:Map<string, string>;

    constructor(name:string) {
        this._name = name;
        this._bus = new EventBus();
        this._eventMap = new Map();
    }

    get name() {
        return this._name;
    }

    public publishEvent(sourceId:string, eventId:string, payload?:unknown) {
        const mapped = this._eventMap.get(eventId) || eventId;
        console.log('[beanlink][publish]['+sourceId+'] ' + eventId + ' = ' + JSON.stringify(payload));
        this._bus.publish({
            type: mapped,
            payload
        });
    }

    public subscribeToEvent(eventId:string, handler:StateChangeHandler) {
        this._bus.subscribe(eventId, (event) => {
            handler({payload: event.payload});
        });
    }

    public mapEvent(from:string, to:string) {
        this._eventMap.set(from, to);
    }
}