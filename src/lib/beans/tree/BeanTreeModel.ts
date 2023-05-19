import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeModel {
    private _name:string;
    private _rootPromise:Promise<BeanTreeNode>;
    private _root:BeanTreeNode|null;
    private _persistence:BeanTreePersistence;
    
    constructor(name:string, source: BeanTreeSource, persistence:BeanTreePersistence) {
        this._name = name;
        this._persistence = persistence;
        this._rootPromise = source.getRootNode();
        this._root = null;
    }
    
    public async saveTree() {
        if (!this._root) {
            await this.getRootNode();
        }
        this._persistence.saveTree(this._root!);
    }
    
    public async getRootNode() {
        this._root = await  this._rootPromise;
        return this._root;
    }
}
