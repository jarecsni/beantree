import { describe, it, expect } from 'vitest';
import { BeanTreeSourceMulti } from './BeanTreeSourceMulti';
import { BeanTreeSourceJSON } from './BeanTreeSourceJSON';
import bean from './__test__/example2.json';
import beanOverride from './__test__/example2_override.json';

describe('BeanTreeSourceMulti', () => {
    it('applies a persistent override', async () => {
        const source = new BeanTreeSourceJSON(bean);
        const override = new BeanTreeSourceJSON(beanOverride);
        const multi = new BeanTreeSourceMulti(source, override);
        const node = await multi.getRootNode();
        expect(node.children![1].props!.text).toEqual('Well this is an overridden string...');
    });
});