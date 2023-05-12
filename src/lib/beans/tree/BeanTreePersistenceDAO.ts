import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';

export class BeanTreePersistenceDAO implements BeanTreePersistence {
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
    }
    async saveTree(node: BeanTreeNode) {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        let savedTree = await dao.select( 
            [
                {field: '__name__', op: '==', value: this._treeName}
            ]
	    );
        console.log('saved tree found (upon saving)', savedTree);
        if (savedTree) {
            dao.update(this._treeName, node);
        } else {
            dao.insert(node, this._treeName);
        }
    }
}