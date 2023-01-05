import type { BeanMetaInfo } from '$lib/beans/BeanMetaInfo';
//@ts-ignore
import SlotContainer from './SlotContainer.svelte';

export const getMetaInfo = ():BeanMetaInfo => ({
    name: 'SlotContainer',
    renderers: {
        desktop: SlotContainer
    }
})