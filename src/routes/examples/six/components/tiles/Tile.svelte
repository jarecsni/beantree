
<div class="tile">
    <div class="tile-row-1">
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
    <div class="price">
        Price
    </div>
    <div class="buttons">
        Buttons
    </div>
</div>

<script lang="ts">
    import IconButton from '@smui/icon-button';
	import { BeanLink, type EventCreator } from '../../BeanLink';
	import Select, { Option } from '@smui/select';
	import { Streamer } from '../../datastream/Streamer';
	import { closeTileEvent, symbolChangedEvent } from './types';
	
    export let id:string;
    export let value = '';
    export let producesEventCloseTileEvent:EventCreator = closeTileEvent;
    export let producesSymbolChangedEvent:EventCreator = symbolChangedEvent;

    const beanLink:BeanLink = BeanLink.getInstanceInContext();
   
    let symbols = Streamer.getInstance().getSymbols();

    function closeTile() {
        beanLink.publishEvent(id, producesEventCloseTileEvent({id, sourceId: id}));
    }

    $: {
        beanLink.publishEvent(id, producesSymbolChangedEvent({id, sourceId: id, symbol: value}));        
    }
</script>

<style>
    .tile {
        display: flex;
        flex-direction: column;
        background-color: lightsteelblue;
        margin: 5px;
        padding: 5px;
    }
    .tile-row-1 {
        display: flex;
        flex-direction: row;
        background-color: lightsteelblue;
    }
</style>