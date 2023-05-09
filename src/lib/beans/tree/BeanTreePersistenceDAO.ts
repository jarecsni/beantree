import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';

export class BeanTreePersitrenceDAO implements BeanTreePersistence {
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
    }
    saveTree(node: BeanTreeNode):void {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        let savedTree;
        dao.select((treeDef) => {savedTree = treeDef}, 
            [
                {field: 'admin.firestore.FieldPath.documentId()', op: '==', value: this._treeName}
            ]
	    );
        if (savedTree) {
            dao.update(this._treeName, node);
        } else {
            dao.insert(node, this._treeName);
        }
    }
}