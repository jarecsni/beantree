
<svelte:component this={beanRendererComponent} />

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { BeanTreeNode } from './BeanTree';
	import { getPlatformSpecificRenderer } from './utils';
    export let bean:BeanTreeNode;
    const beanRendererComponent:typeof SvelteComponent | undefined = getPlatformSpecificRenderer(bean);
</script>