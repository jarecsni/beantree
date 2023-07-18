
import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import { EventBus, createEventDefinition } from "ts-bus";


type BusPayload = {type:string, payload:KVType};
type StateChangeHandler = (payload:BusPayload) => void;


export class BackboneService {
    
    private static instance: BackboneService;
    private static _bus: EventBus = new EventBus();
    public static get bus(): EventBus {
      return BackboneService._bus;
    }
    public static set bus(value: EventBus) {
      BackboneService._bus = value;
    }
    private static store: Map<string, unknown> = new Map();
    private static stateHandlerMap: Map<string, Array<StateChangeHandler>> = new Map();

    private constructor() {
      // Private constructor to prevent instantiation from outside the class
    }
  
    public static getInstance(): BackboneService {
      if (!BackboneService.instance) {
        BackboneService.instance = new BackboneService();
      }
      return BackboneService.instance;
    }
  
    public stateChange(stateId:string, state:unknown): void {
        const prev = BackboneService.store.get(stateId);
        BackboneService.store.set(stateId, state);
        console.log('[backbone:stateChange:'+stateId+']', prev, state);
        const payload = {
            type: 'state.change.' + stateId,
            payload: {
                prev,
                actual: state
            }
        };
        BackboneService.bus.publish(payload)
        const handlers = BackboneService.stateHandlerMap.get(stateId);
        if (handlers) {
            handlers.forEach(h => h(payload));
        }
    }

    public registerFor(stateId:string, handler:StateChangeHandler) {
        let handlers = BackboneService.stateHandlerMap.get(stateId);
        if (!handlers) {
            handlers = [];
            BackboneService.stateHandlerMap.set(stateId, handlers);
        }
        handlers.push(handler);
    }
  }
