import type { BeanMetaInfo } from '$lib/beans/BeanMetaInfo';
//@ts-ignore
import HelloWorld from './HelloWorld.svelte';

export const getMetaInfo = ():BeanMetaInfo => ({
    name: 'helloworld',
    renderers: {
        desktop: HelloWorld
    }
})