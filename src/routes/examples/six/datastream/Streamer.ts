import type { KVType } from "$lib/beans/tree/BeanTreeNode";
import type { StreamHandler } from "./StreamHandler";
import data from "./data.json";

class DataPump {
    private symbol:string;
    private index: number = 0;
    private numbers:Array<number>;
    private running:boolean = false;

    constructor(symbol:string, numbers:Array<number>, handler:(symbol:string,number:number)=>void) {
        this.symbol = symbol;
        this.numbers = numbers;
    }

    start():void {
        this.running = true;
        const doWork =() => {
            // Do the work here
            const number = this.next();

            if (this.running) {
                // Generate a random interval between 1 and 5 seconds (1000 to 5000 milliseconds)
                const randomInterval = Math.floor(Math.random() * 4000) + 1000;
            
                // Call the doWork function again after the random interval
                setTimeout(doWork, randomInterval);
            }
        }        
    }

    stop():void {
        this.running = false;
        this.index = 0;
    }

    next():number {
        if (++this.index >= this.numbers.length) {
            this.index = 0;
        }
        return this.numbers[this.index];        
    }

}

export class Streamer {
    
    private static instance: Streamer;
    private handlerMap: Map<String, Array<StreamHandler>>;
    private data: {[key: string]: Array<number>};
    private pumpers:Array<DataPump> = [];

    private constructor() {
        // Private constructor to prevent instantiation from outside the class
        this.handlerMap = new Map();
        this.data = data;
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

    public startStreaming() {
        for (const symbol in this.data) {
            const pumper = new DataPump(symbol, this.data[symbol], (symbol:string, number:number) => {
                this.publish(symbol, number);
            });
            this.pumpers.push(pumper);
            pumper.start();
        }
    }

    public stopStreaming() {
        this.pumpers.forEach(p => {
            p.stop();
        })
        this.pumpers = [];
    }

    private publish(symbol:string, number:number) {
        const handlers:Array<StreamHandler>|undefined = this.handlerMap.get(symbol);
        if (handlers) {
            handlers.forEach(h => {
                h.onData(symbol, number);
            })
        }
    }
}