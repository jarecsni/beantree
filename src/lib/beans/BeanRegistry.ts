import type { BeanMetaInfo } from './BeanMetaInfo';

export class BeanRegistry {
    private static instance: BeanRegistry;
    private registry = new Map<string, BeanMetaInfo>();
    /**
     * Singleton.
     */
    private constructor() { }

    public static getInstance(): BeanRegistry {
        if (!BeanRegistry.instance) {
            BeanRegistry.instance = new BeanRegistry();
        }
        return BeanRegistry.instance;
    }

    public registerBean(beanMetaInfo:BeanMetaInfo):void {
        this.registry.set(beanMetaInfo.name, beanMetaInfo);
    }

    geBeanMetaInfo(name:string) {
        return this.registry.get(name); 
    }
}