
<svelte:component this={beanRendererComponent} {bean} {...props}/>

<script lang="ts">
	// TODO Svelte does not currently support dynamic named slots, so children will be in an array
	import GenericBean from '$lib/beans/GenericBean.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode, KVType } from './BeanTree';
	import { getPlatformSpecificRenderer } from './utils';
    export let bean:BeanTreeNode;
	const props:KVType = bean.props || {}
	if (bean.children) {
		bean.children.forEach(childBean => {
			props[childBean.instanceId] = childBean;
		});
	}
	bean.props = props;
    const beanRendererComponent:typeof SvelteComponent | undefined = getPlatformSpecificRenderer(bean);
</script>