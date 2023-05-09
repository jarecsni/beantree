import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';
import firebaseAdmin from 'firebase-admin';

export class BeanTreePersistenceDAO implements BeanTreePersistence {
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
    }
    saveTree(node: BeanTreeNode):void {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        let savedTree;
        const arr = [this._treeName];
        const refArr = arr.map(id => firebaseAdmin.firestore().collection("beantree").doc(id));
        dao.select((treeDef) => {savedTree = treeDef}, 
            [
                {field: firebaseAdmin.firestore.FieldPath.documentId(), op: 'in', value: refArr}
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