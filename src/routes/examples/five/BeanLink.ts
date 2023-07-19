import { EventBus, createEventDefinition } from "ts-bus";

type StateChangeHandler = (payload:KVType) => void;

export class BeanLink {
    
    private _name:string;
    private _bus:EventBus;
    private _stateMap:Map<string, string>;

    constructor(name:string) {
        this._name = name;
        this._bus = new EventBus();
        this._stateMap = new Map();
    }

    get name() {
        return this._name;
    }

    public publishStateChange(id:string, stateName:string, value:unknown) {
        const mapped = this._stateMap.get(stateName) || stateName;
        this._bus.publish({
            type: 'state.changed.' + mapped,
            payload: value
        });
    }

    public subscribeToStateChange(name:string, handler:StateChangeHandler) {
        this._bus.subscribe('state.changed.'+name, (event) => {
            handler({value: event.payload});
        });
    }

    public mapState(from:string, to:string) {
        this._stateMap.set(from, to);
    }
}