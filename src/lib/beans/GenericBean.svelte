<div class="wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="overlay" class:selected on:contextmenu|preventDefault={handleOverlayClick} />
	<svelte:component this={beanRendererComponent} {bean} {...props} />
</div>
<div style="min-width: 100px; z-index: 20">
	<Menu bind:this={menu}>
		<List>
			<Item on:SMUI:action={() => (alert('Cut'))}>
				<Text>Cut</Text>
			</Item>
			<Item on:SMUI:action={() => (alert('Copy'))}>
				<Text>Copy</Text>
			</Item>
			<Item on:SMUI:action={() => (alert('Paste'))}>
				<Text>Paste</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => (alert('Delete'))}>
				<Text>Delete</Text>
			</Item>
		</List>
	</Menu>
</div>

<script lang="ts">
	import { selectedInstanceId } from './tree/store';
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode, KVType } from './tree/BeanTreeNode';
	import { getPlatformSpecificRenderer } from './utils';
	import { getTreeNodePath } from './tree/BeanTreeNode';
	import Menu from '@smui/menu';
  	import List, { Item, Separator, Text } from '@smui/list';
 
	export let bean: BeanTreeNode;
	const props: KVType = bean.props || {};
	let selected = false;

	let menu: Menu;


	$: {
		selected = getTreeNodePath(bean) == $selectedInstanceId;
	}
	if (bean.children) {
		bean.children.forEach((childBean) => {
			childBean.parent = bean;
			props[childBean.instanceId] = childBean;
		});
	}
	bean.props = props;
	const beanRendererComponent: typeof SvelteComponent | undefined =
		getPlatformSpecificRenderer(bean);
	function handleOverlayClick(event: Event) {
		console.log(event);
		console.log(menu);
		menu.setOpen(true);
	}
</script>


<style>
	.wrapper {
		position: relative;
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
