import { describe, it, expect } from 'vitest';
import { BeanTreeSourceJSON } from './BeanTreeSourceJSON';
import bean from './__test__/example2.json';

describe('BeanTreeSourceJSON', () => {
    it('can load a file', async () => {
        const source = new BeanTreeSourceJSON(bean);
        const root = await source.getRootNode();
        expect(root).not.toBe(null);
        expect(root.bean).toEqual('SlotContainer');
        expect(root.children).toHaveLength(2);
    });
});