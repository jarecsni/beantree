
<h2>Example #1</h2>
<p>
    This example is using a bean definition in a JSON to show how a bean node can be rendered using the registered 
    Bean (HelloWorld in this case).
</p>

<div class="content">
    <BeanTreeExplorerSwitch/>
    <div class="explorerWrapper">
        <div class="explorer">
            <BeanTreeExplorer node={bean}/>
        </div>
        <div><GenericBean {bean}/></div>
    </div>
</div>

<script lang="ts">
	import BeanTreeExplorer from '$lib/beans/explorer/BeanTreeExplorer.svelte';
	import BeanTreeExplorerSwitch from '$lib/beans/explorer/BeanTreeExplorerSwitch.svelte';
	import GenericBean from '$lib/beans/GenericBean.svelte';
    import { BeanTreeModel } from '$lib/beans/tree/BeanTreeModel';
	import { BeanTreePersistenceDAO } from '$lib/beans/tree/BeanTreePersistenceDAO';
	import { BeanTreeSourceDAO } from '$lib/beans/tree/BeanTreeSourceDAO';
	import { BeanTreeSourceJSON } from '$lib/beans/tree/BeanTreeSourceJSON';
	import { BeanTreeSourceMulti } from '$lib/beans/tree/BeanTreeSourceMulti';
    import {init} from '../../../application';
    import beanDefinition from './example3.json';
    init();
    const model = new BeanTreeModel("example3", 
        new BeanTreeSourceMulti(new BeanTreeSourceJSON(beanDefinition), new BeanTreeSourceDAO('example3')),
        new BeanTreePersistenceDAO('example3')
    );
    const bean = model.getRootNode();
    model.saveTree();
</script>

<style>
    .content {
        background: lightgray;
    }
    .explorerWrapper {
        display: flex;
    }
</style>