import type { SvelteComponent } from 'svelte';
import type { BeanMetaInfo } from './BeanMetaInfo'
import type { BeanTreeNode } from './BeanTree';
import { BeanRegistry } from './BeanRegistry';

// TODO this is hard coded to be desktop browser - will need to add mechanism to set the current platform
export const getPlatformSpecificRenderer = (bean:BeanTreeNode):typeof SvelteComponent | undefined => {
    const beanMetaInfo:BeanMetaInfo|undefined = BeanRegistry.getInstance().geBeanMetaInfo(bean.bean);
    return beanMetaInfo?.renderers.desktop;
}