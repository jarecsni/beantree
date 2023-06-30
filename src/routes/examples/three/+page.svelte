
<h2>Example #1</h2>
<p>
    This example is using a bean definition in a JSON to show how a bean node can be rendered using the registered 
    Bean (HelloWorld in this case).
</p>

<div class="content">
    <BeanTreeExplorerSwitch/>
    <div class="explorerWrapper">
        {#if bean}
            <div class="explorer">
                <BeanTreeExplorer node={bean}/>
            </div>
            <div><GenericBean {bean}/></div>
        {/if}
    </div>
</div>

<script lang="ts">
	import BeanTreeExplorer from '$lib/beans/explorer/BeanTreeExplorer.svelte';
	import BeanTreeExplorerSwitch from '$lib/beans/explorer/BeanTreeExplorerSwitch.svelte';
	import GenericBean from '$lib/beans/GenericBean.svelte';
    import { BeanTreeModel } from '$lib/beans/tree/BeanTreeModel';
	import { BeanTreeModelService } from '$lib/beans/tree/BeanTreeModelService';
	import type { BeanTreeNode } from '$lib/beans/tree/BeanTreeNode';
	import { BeanTreePersistenceDAO } from '$lib/beans/tree/BeanTreePersistenceDAO';
	import { BeanTreeSourceDAO } from '$lib/beans/tree/BeanTreeSourceDAO';
	import { BeanTreeSourceJSON } from '$lib/beans/tree/BeanTreeSourceJSON';
	import { BeanTreeSourceMulti } from '$lib/beans/tree/BeanTreeSourceMulti';
    import {init} from '../../../application';
    import beanDefinition from './example3.json';
    init();
    BeanTreeModelService.getInstance().setBeanTreeModelFor(beanDefinition, 'example3');
    const model = BeanTreeModelService.getInstance().getTreeModel();
    let bean:BeanTreeNode|undefined;
    model.getRootNode().then(node => {bean = node;});
</script>

<style>
    .content {
        background: lightgray;
    }
    .explorerWrapper {
        display: flex;
    }
</style>
