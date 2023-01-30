
{#each nodes as node (node.id) }
    {#if node.parentId == parentId }
        {#if node.name == 'portal'}
            <TreeBranch rootContent={node.name} onClick={()=>{onSelect(node.id)}} selected={node.id==selectedWidgetId}>
                <BeanExplorerTreeBranch {nodes} parentId={node.id}/>
            </TreeBranch>
        {:else}
            <TreeLeaf onClick={()=>{onSelect(node.id)}} selected={node.id==selectedWidgetId}>
                <div>
                    {node.name}
                </div>
            </TreeLeaf>
        {/if}
    {/if}
{/each}


<script lang="ts">
	//import {selectedWidgetId} from './../stores';
	import BeanExplorerTreeBranch from './BeanExplorerTreeBranch.svelte';
    import {TreeLeaf, TreeBranch} from "$lib/ui/treeview";
    export let parentId:string, nodes = [];

    let selectedWidgetId = ''; // FIXME remove this when store is enabled

    function onSelect(nodeId:string) {
        //selectedWidgetId.set(nodeId !== $selectedWidgetId ? nodeId : '');
    }
</script>