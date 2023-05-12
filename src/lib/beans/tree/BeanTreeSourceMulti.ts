import { json } from '@sveltejs/kit';
import type { BeanTreeNode } from './BeanTreeNode';
import type { BeanTreeSource } from './BeanTreeSource';
import type { BeanTreeSourceJSON } from './BeanTreeSourceJSON';

export class BeanTreeSourceMulti implements BeanTreeSource {
    private _jsonSource:BeanTreeSourceJSON;
    private _persistentSource:BeanTreeSource;
    private _rootNode:BeanTreeNode|undefined;
    constructor(jsonSource:BeanTreeSourceJSON, persistentSource:BeanTreeSource) {
        this._jsonSource = jsonSource;
        this._persistentSource = persistentSource;
    }
    async getRootNode(): Promise<BeanTreeNode|undefined> {
        if(!this._rootNode) {
            let json = await this._jsonSource.getRootNode();
            console.log('json=', json);
            let override = await this._persistentSource.getRootNode();
            console.log('override=', override);
            this._rootNode = override ? override : json;
        }
        return Promise.resolve(this._rootNode);
    }
}