import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

/*
* BeanTreeSourceFirebase is for loading bean tree definitions from Firebase 
*/
export class BeanTreeSourceDAO implements BeanTreeSource {
    private _jsonObject:BeanTreeNode | undefined;
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
        this.loadTree()
    } 
    private async loadTree():Promise<unknown[]> {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        return dao.select(
            [
                {field: '__name__', op: '==', value: this._treeName}
            ]);
    }

    public async getRootNode(): Promise<BeanTreeNode|undefined> {
        if(!this._jsonObject) {
            this._jsonObject = (await this.loadTree())[0] as BeanTreeNode;
        }
        console.log('dao loaded:', JSON.stringify(this._jsonObject))
        return this._jsonObject;
    }
}