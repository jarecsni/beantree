import { describe, it, expect } from 'vitest';
import { BeanTreeSourceJSON } from './BeanTreeSourceJSON';
import bean from './__test__/example2.json';

describe('BeanTreeSourceJSON', () => {
    it('can load a file', async () => {
        const source = new BeanTreeSourceJSON('myTree', bean);
        const root = await source.getRootNode();
        expect(root).not.toBe(null);
        expect(root.bean).toEqual('SlotContainer');
        expect(root.children).toHaveLength(2);
    });
    it('can save the tree to local storage', async () => {
        const source = new BeanTreeSourceJSON('myTree', bean);
        const root = await source.getRootNode();
        root.children!.push({
            bean: "StringBean",
            instanceId: "bean123",
            props: {
                "text": "Another, dynamic string..."
            }
        })
        source.saveTree();
        const savedSource = new BeanTreeSourceJSON('myTree', bean);
        const savedRoot = savedSource.getRootNode();
        expect(savedRoot.children).toHaveLength(3);
        console.log(savedRoot.children![2].props!['text']);
        expect(savedRoot.children![2].props!['text']).toBe('Another, dynamic string...');
    });
});