import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

export class BeanTreeModel {
    private _root:BeanTreeNode;
    private _source:BeanTreeSource;
    constructor(source: BeanTreeSource) {
        this._source = source;
        this._root = source.getRootNode();
    }
    public saveTree() {
        this._source.saveTree();
    }
}
