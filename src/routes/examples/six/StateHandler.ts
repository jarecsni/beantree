import type { KVType } from "$lib/beans/tree/BeanTreeNode";

export class StateHandler {
    private static _instance:StateHandler;
    private state:KVType = {};
    private constructor() {
    }
    get instance():StateHandler {
        if (!StateHandler._instance) {
            StateHandler._instance = new StateHandler();
        }
        return StateHandler._instance;
    }
    getStateFor(key:string):unknown {
        return this.state[key];
    }
    setStateFor(key:string, value:unknown) {
        this.state[key] = value;
    }
}