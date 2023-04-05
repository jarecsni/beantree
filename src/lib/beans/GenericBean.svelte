<div class="wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="overlay" class:selected on:contextmenu|preventDefault={handleOverlayClick}>

	</div>
	<svelte:component this={beanRendererComponent} {bean} {...props}/>
</div>

<script lang="ts">
	import {selectedInstanceId} from './tree/store';
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode, KVType } from './tree/BeanTreeNode';
	import { getPlatformSpecificRenderer } from './utils';
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
	function handleOverlayClick(event:Event) {
		console.log(event)
	}
</script>
<style>
	.wrapper {
		position: relative;
		overflow: hidden;
	}
	.overlay {
	  	position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: 1px dotted;
		display: none;
	}
	.selected {
	  	display: inline-block;
		z-index: 10;
	}
</style>