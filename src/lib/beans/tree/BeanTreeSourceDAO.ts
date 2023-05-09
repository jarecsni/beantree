import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

/*
* BeanTreeSourceFirebase is for loading bean tree definitions from Firebase 
*/
export class BeanTreeSourceDAO implements BeanTreeSource {
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    private _treeName:string;
    constructor(treeName:string, jsonObject: BeanTreeNode) {
        this._treeName = treeName;
        this._jsonObject = jsonObject;
        this.loadTree();
    } 
    private async loadTree() {
        const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('beantree');
        let savedTree;
        dao.select((treeDef) => {savedTree = treeDef}, 
            [
                {field: 'admin.firestore.FieldPath.documentId()', op: '==', value: this._treeName}
            ]
	    );
        console.log(savedTree);
        if (savedTree) {
            this._jsonObject = JSON.parse(savedTree);
        }
    }

    public getRootNode(): BeanTreeNode {
        return this._jsonObject;
    }
}