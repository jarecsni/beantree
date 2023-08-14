
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
	import { BeanLink } from '../../BeanLink';
	import Select, { Option } from '@smui/select';
	import { closeTileEvent } from './types';
	import { Streamer } from '../../datastream/Streamer';
	
    export let id:string;
    export let value = '';
    const beanLink:BeanLink = BeanLink.getInstanceInContext();
   
    let symbols = Streamer.getInstance().getSymbols();

    function closeTile() {
        beanLink.publishEvent(id, closeTileEvent({id, sourceId: id}));
    }
</script>

<style>
    .tile {
        display: flex;
        flex-direction: row;
        background-color: lightsteelblue;
        margin: 5px;
        padding: 5px;
    }
</style>