import type { BeanMetaInfo } from '$lib/beans/BeanMetaInfo';
//@ts-ignore
import StringBean from './StringBean.svelte';

export const getMetaInfo = ():BeanMetaInfo => ({
    name: 'StringBean',
    renderers: {
        desktop: StringBean
    },
    properties: {
        sections: [
            {
                name: 'Bean Properties', properties: [
                    {name: 'text', description: 'The text to display'}
            ]
        }]
    }
})