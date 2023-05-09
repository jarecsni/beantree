import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';
import firebaseAdmin from 'firebase-admin';

/*
* BeanTreeSourceFirebase is for loading bean tree definitions from Firebase 
*/
export class BeanTreeSourceDAO implements BeanTreeSource {
    private _jsonObject:BeanTreeNode | undefined;
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
        this.loadTree();
    } 
    private async loadTree() {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        let savedTree;
        dao.select((treeDef) => {savedTree = treeDef}, 
            [
                {field: firebaseAdmin.firestore.FieldPath.documentId(), op: '==', value: this._treeName}
            ]
	    );
        console.log('--DAO-- savedTree', savedTree);
        if (savedTree) {
            this._jsonObject = JSON.parse(savedTree);
        }
    }

    public getRootNode(): BeanTreeNode|undefined {
        return this._jsonObject;
    }
}