import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';

export class BeanTreePersisrenceLocalStorage implements BeanTreePersistence {
    private _treeName:string;
    constructor(treeName:string) {
        this._treeName = treeName;
    }
    saveTree(node: BeanTreeNode):void {
        localStorage.setItem(this._treeName, JSON.stringify(node));
    }
}