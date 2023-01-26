
<h2>Example #1</h2>
<p>
    This example is using a bean definition in a JSON to show how a bean node can be rendered using the registered 
    Bean (HelloWorld in this case).
</p>

<div class="content">
    <BeanTreeExplorerSwitch/>
    <div class="explorerWrapper">
        <div class="explorer">
            <BeanTreeExplorer/>
        </div>
        <GenericBean {bean}/>
    </div>
</div>

<script lang="ts">
	import BeanTreeExplorer from '$lib/beans/explorer/BeanTreeExplorer.svelte';
	import BeanTreeExplorerSwitch from '$lib/beans/explorer/BeanTreeExplorerSwitch.svelte';
	import GenericBean from '$lib/beans/GenericBean.svelte';
    import {init} from '../../../application';
    import bean from './example2.json';
    init();
</script>

<style>
    .content {
        background: lightgray;
    }
    .explorerWrapper {
        display: flex;
    }
    .explorer {
        margin-right: 5px;
    }
</style>