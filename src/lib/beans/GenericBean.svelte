<div class="wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="overlay" class:selected on:contextmenu|preventDefault={handleOverlayClick} />
	<svelte:component this={beanRendererComponent} {bean} {...props} />
</div>
<div style="min-width: 100px; z-index: 20">
	<Menu bind:this={menu}>
		<List>
			<Item on:SMUI:action={editProperties} disabled={!configObject}>
				<Text>Properties</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => (alert('Delete'))}>
				<Text>Some bean action</Text>
			</Item>
		</List>
	</Menu>
</div>
<Dialog bind:open={configureNodeDialogueOpen}>
	<Title>Bean Properties</Title>
	<Content>
		<div class="dialogueContent">
			{#if configObject}
				<PropertyEditor obj={configObject}/>
			{/if}
		</div>
	</Content>
	<Actions>
		<Button>
			<Label>Cancel</Label>
		</Button>
		<Button on:click={doSaveConfig}>
			<Label>Save</Label>
		</Button>
	</Actions>
</Dialog>    

<script lang="ts">
	import { selectedInstanceId } from './tree/store';
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode, KVType } from './tree/BeanTreeNode';
	import { getPlatformSpecificRenderer, mergePropsWithMetaImpl, convertToPlainObject } from './utils';
	import { getTreeNodePath } from './tree/BeanTreeNode';
	import Menu from '@smui/menu';
  	import List, { Item, Separator, Text } from '@smui/list';
	import PropertyEditor from '$lib/beans/property-editor/PropertyEditor.svelte';
    import type {PropertiesObject} from '$lib/beans/property-editor/PropertyEditorTypes';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { BeanRegistry } from './BeanRegistry';

	export let bean: BeanTreeNode;

	const props: KVType = bean.props || {};
	let selected = false;
	let menu: Menu;
	let configureNodeDialogueOpen = false;
	
	let metaInfo = BeanRegistry.getInstance().geBeanMetaInfo(bean.bean);
	let	configObject:PropertiesObject;
	if(metaInfo?.properties && bean.props) {
		configObject = mergePropsWithMetaImpl(bean.props, metaInfo.properties, bean.bean);
	}
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
	const beanRendererComponent: typeof SvelteComponent | undefined = getPlatformSpecificRenderer(bean);
	function handleOverlayClick(event: Event) {
		menu.setOpen(true);
	}
	function editProperties() {
		configureNodeDialogueOpen = true;
	}
	function doSaveConfig() {
		console.log('doSaveConfig', JSON.stringify(configObject));
		console.log('bean', bean);
		const props = convertToPlainObject(configObject);
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
