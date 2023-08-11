
<div class="tile">
    <div>
        <Select bind:value label="Symbol">
            {#each symbols as symbol}
                <Option value={symbol}>{symbol}</Option>
            {/each}
        </Select>
    </div>
    <div class="close-button">
        <IconButton class="material-icons" on:click={()=>{closeTile()}}>close</IconButton>
    </div>
</div>

<script lang="ts">
    import IconButton from '@smui/icon-button';
	import { getContext } from "svelte";
	import type { BeanLink } from "../../BeanLink";
	import Select, { Option } from '@smui/select';
	import { closeTileEvent } from './types';
	
    export let id:string;
    export let value = '';
    const beanLink:BeanLink = getContext('beanlink');
  
    let symbols = ['AAPL', 'GOOGL', 'SI', 'AMZN'];

    function closeTile() {
        beanLink.publishEvent(id, closeTileEvent({id}));
    }
</script>

<style>
    .tile {
        display: flex;
        flex-direction: row;
        background-color: lightsteelblue;
        margin: 5px;
    }
</style>