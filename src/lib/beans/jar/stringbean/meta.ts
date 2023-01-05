import type { BeanMetaInfo } from '$lib/beans/BeanMetaInfo';
//@ts-ignore
import StringBean from './StringBean.svelte';

export const getMetaInfo = ():BeanMetaInfo => ({
    name: 'StringBean',
    renderers: {
        desktop: StringBean
    }
})