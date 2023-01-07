
<svelte:component this={beanRendererComponent} {bean}>
	{#if bean.children}
		{#each bean.children as childBean}
			<span>
				<GenericBean bean={childBean}/>
			</span>
		{/each}
	{/if}
</svelte:component>

<script lang="ts">
	// TODO Svelte does not currently support dynamic named slots, so children will be in an array
	import GenericBean from '$lib/beans/GenericBean.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode } from './BeanTree';
	import { getPlatformSpecificRenderer } from './utils';
    export let bean:BeanTreeNode;
    const beanRendererComponent:typeof SvelteComponent | undefined = getPlatformSpecificRenderer(bean);
</script>