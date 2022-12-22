<div>
    Hello {$name}!
</div>

<script lang="ts">
	import type { BeanTreeNode } from '$lib/beans/BeanTree';
	import {name} from './store';
    export let bean:BeanTreeNode;
    $name = bean.state.value as string;
</script>