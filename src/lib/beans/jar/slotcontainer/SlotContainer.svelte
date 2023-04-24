<GenericBean bean={bean1}/>
<GenericBean bean={bean2}/>

<script lang="ts">
	import GenericBean from '$lib/beans/GenericBean.svelte';
    import type { BeanTreeNode } from '$lib/beans/tree/BeanTreeNode';
    export let bean1:BeanTreeNode;
    export let bean2:BeanTreeNode;
    export let bean:BeanTreeNode;
</script>