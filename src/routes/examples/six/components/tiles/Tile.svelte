
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
	import { Streamer } from '../../datastream/Streamer';
	import type { BusEvent, EventCreatorFn } from 'ts-bus/types';
	
    export let id:string;
    export let value = '';
    export let closeTileEvent:EventCreatorFn<BusEvent>;

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