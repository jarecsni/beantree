import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

/*
* BeanTreeSourceJSON is a simple file based tree source, loading the tree definition from a file
*/
export class BeanTreeSourceJSON implements BeanTreeSource {
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    constructor(jsonObject: BeanTreeNode) {
        this._jsonObject = jsonObject;
    } 
    public getRootNode(): Promise<BeanTreeNode|undefined> {
        return Promise.resolve(this._jsonObject);
    }
}