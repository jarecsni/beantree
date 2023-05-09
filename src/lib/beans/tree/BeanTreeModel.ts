import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersistence } from './BeanTreePersistence';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeModel {
    private _name:string;
    private _root:BeanTreeNode|undefined;
    private _source:BeanTreeSource;
    private _persistence:BeanTreePersistence;
    constructor(name:string, source: BeanTreeSource, persistence:BeanTreePersistence) {
        this._name = name;
        this._source = source;
        this._persistence = persistence;
        this._root = source.getRootNode();
    }
    public saveTree() {
        if (this._root) {
            this._persistence.saveTree(this._root);
        }
    }
    public getRootNode() {
        return this._root;
    }
}
