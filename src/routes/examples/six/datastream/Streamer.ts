import type { StreamHandler } from "./StreamHandler";

export class Streamer {
    
    private static instance: Streamer;
    handlerMap: Map<String, Array<StreamHandler>>;
    private constructor() {
        // Private constructor to prevent instantiation from outside the class
        this.handlerMap = new Map();
    }
  
    public static getInstance(): Streamer {
      if (!Streamer.instance) {
        Streamer.instance = new Streamer();
      }
      return Streamer.instance;
    }

    public connect(symbol:string, handler:StreamHandler) {
        let handlers = this.handlerMap.get(symbol);
        if (!handlers) {
            handlers = [];
            this.handlerMap.set(symbol, handlers);
        }
        handlers.push(handler);
    }

    public disconnect(symbol:string, handler:StreamHandler) {
        const handlers = this.handlerMap.get(symbol);
        if (handlers) {
            const index = handlers.findIndex((item) => item === handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }  
        }
    }
}