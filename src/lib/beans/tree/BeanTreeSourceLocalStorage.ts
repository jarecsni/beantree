import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

/*
* BeanTreeSourceFirebase is for loading bean tree definitions from Firebase 
*/
export class BeanTreeSourceLocalStorage implements BeanTreeSource {
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    private _treeName:string;
    
    constructor(treeName:string) {
        this._treeName = treeName;
        this.loadTree();
    } 
    private async loadTree() {
        if (typeof window !== 'undefined') {
            const savedTree = localStorage.getItem(this._treeName);
            if (savedTree) {
                this._jsonObject = JSON.parse(savedTree);
            }
        }
    }

    public getRootNode(): BeanTreeNode {
        return this._jsonObject;
    }
}