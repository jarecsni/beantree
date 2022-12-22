
<h2>Example #1</h2>
<p>
    This example is using a bean definition in a JSON to show how a bean node can be rendered using the registered 
    Bean (HelloWorld in this case).
</p>

<div class="content">
    <BeanTreeWalker {bean}/>
</div>

<script lang="ts">
	import BeanTreeWalker from '$lib/beans/BeanTreeWalker.svelte';
    import {init} from '../../../application';
    import bean from './example1.json';
    init();
</script>

<style>
    .content {
        background: lightgray
    }
</style>