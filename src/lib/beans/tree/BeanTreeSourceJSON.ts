import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';

/*
* BeanTreeSourceJSON is a simple file based tree source, loading the tree definition from a file
* and saving it in local storage. 
* 
* The tree can be saved as a whole, there is no incremental update or lazy loading with this source.
*/
export class BeanTreeSourceJSON implements BeanTreeSource {
    private _treeName:string;
    private _jsonObject:BeanTreeNode = {} as BeanTreeNode;
    constructor(treeName:string, jsonObject: BeanTreeNode) {
        this._treeName = treeName;
        this._jsonObject = jsonObject;
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
    public saveTree(): void {
        localStorage.setItem(this._treeName, JSON.stringify(this._jsonObject));
    }
    public getRootNode(): BeanTreeNode {
        return this._jsonObject;
    }
}