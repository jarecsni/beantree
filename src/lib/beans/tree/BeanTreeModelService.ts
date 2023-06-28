import { BeanTreeModel } from "./BeanTreeModel";
import type { BeanTreeNode } from "./BeanTreeNode";
import { BeanTreePersistenceDAO } from "./BeanTreePersistenceDAO";
import { BeanTreeSourceDAO } from "./BeanTreeSourceDAO";
import { BeanTreeSourceJSON } from "./BeanTreeSourceJSON";
import { BeanTreeSourceMulti } from "./BeanTreeSourceMulti";


export class BeanTreeModelService {
    private static instance: BeanTreeModelService;
    private beanTreeModel?:BeanTreeModel;
    /**
     * Singleton.
     */
    private constructor() { }

    public static getInstance(): BeanTreeModelService {
        if (!BeanTreeModelService.instance) {
            BeanTreeModelService.instance = new BeanTreeModelService();
        }
        return BeanTreeModelService.instance;
    }

    public setBeanTreeModelFor(beanDefinition: BeanTreeNode, name:string):void {
        this.beanTreeModel = new BeanTreeModel( 
            new BeanTreeSourceMulti(new BeanTreeSourceJSON(beanDefinition), new BeanTreeSourceDAO(name)),
            new BeanTreePersistenceDAO(name)
        );
    }

    public getTreeModel():BeanTreeModel {
        return this.beanTreeModel!;
    }
}