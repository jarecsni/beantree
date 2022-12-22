
<GenericBean {bean}/>

<script lang="ts">
	import type { BeanTreeNode } from '$lib/beans/BeanTree';
	import GenericBean from './GenericBean.svelte';
    export let bean:BeanTreeNode;
</script>