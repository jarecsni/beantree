import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreePersisrence } from './BeanTreePersistence';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeModel {
    private _name:string;
    private _root:BeanTreeNode;
    private _source:BeanTreeSource;
    private _persistence:BeanTreePersisrence;
    constructor(name:string, source: BeanTreeSource, persistence:BeanTreePersisrence) {
        this._name = name;
        this._source = source;
        this._persistence = persistence;
        this._root = source.getRootNode();
    }
    public saveTree() {
        this._persistence.saveTree(this._root);
    }
    public getRootNode() {
        return this._root ? this._root : this._source.getRootNode();
    }
}
