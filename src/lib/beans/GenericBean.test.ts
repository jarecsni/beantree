import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from "@testing-library/svelte";
import GenericBean from './GenericBean.svelte';
import * as HelloWorldMeta from '$lib/beans/jar/helloworld/meta';
import { BeanRegistry } from './BeanRegistry';

describe('GenericBean', () => {
    beforeAll(() => {
        BeanRegistry.getInstance().registerBean(HelloWorldMeta.getMetaInfo());
    });
    describe('Basic features', () => {
        it('is able to render a simple node', () => {
            render(GenericBean, { props: { bean: {
                bean: 'HelloWorld',
                instanceId: 'myBean',
                state: { value: 'Mr Bean' }
            }}});

            expect(screen.getByTestId('hello-name').textContent).toBe('Mr Bean');
        });
    });
});