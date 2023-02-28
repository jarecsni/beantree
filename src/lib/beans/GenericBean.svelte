<div class:selected>
	<svelte:component this={beanRendererComponent} {bean} {...props}/>
</div>

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode, KVType } from './tree/BeanTreeNode';
	import { getPlatformSpecificRenderer } from './utils';
	import { selectedInstanceId } from './jar/helloworld/store';
	import { getTreeNodePath } from './tree/BeanTreeNode';
    export let bean:BeanTreeNode;
	const props:KVType = bean.props || {}
	let selected = false;
	$:{
		selected = getTreeNodePath(bean) ==  $selectedInstanceId;
	}
	if (bean.children) {
		bean.children.forEach(childBean => {
			childBean.parent = bean;
			props[childBean.instanceId] = childBean;
		});
	}
	bean.props = props;
    const beanRendererComponent:typeof SvelteComponent | undefined = getPlatformSpecificRenderer(bean);
</script>
<style>
	.selected {
		border: 1px dotted;
	}
</style>