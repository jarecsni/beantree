
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
        <PriceLabel id={labelId}/>
    </div>
    <div class="buttons">
        <EventButton id="bookDeal" label="Book" event={bookDealEvent}/>
    </div>
</div>

<script lang="ts">
    import IconButton from '@smui/icon-button';
	import { BeanLink, type EventCreator } from '../../BeanLink';
	import Select, { Option } from '@smui/select';
	import { Streamer } from '../../datastream/Streamer';
	import { 
        closeTileEvent as _closeTileEvent, 
        symbolChangedEvent as _symbolChangedEvent, 
        bookDealEvent, 
        priceLabelSetValue, 
        priceTickReceivedEvent
    } from './types';
	import PriceLabel from './PriceLabel.svelte';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let value = '';
    export let closeTileEvent:EventCreator = _closeTileEvent;
    export let symbolChangedEvent:EventCreator = _symbolChangedEvent;

    const { beanLink, parentBeanLink } = BeanLink.getInstance('tile');

    let symbols = Streamer.getInstance().getSymbols();

    const labelId = id + '-label';

    function closeTile() {
        parentBeanLink.publishEvent(id, closeTileEvent({id, sourceId: id}));
    }

    $: {
        parentBeanLink.publishEvent(id, symbolChangedEvent({id, sourceId: id, symbol: value}));        
    }

    parentBeanLink.subscribeToEventSource([{
        event: 'price.tick.received',
        predicate: (event: ReturnType<typeof priceTickReceivedEvent>) => {
            return (event.type == 'price.tick.received' && event.payload.symbol === value);
        }
    }], {
        id, handleEvent: (event: ReturnType<typeof priceTickReceivedEvent>)=> {
            beanLink.publishEvent(id, priceLabelSetValue({sourceId: id, value: event.payload.value}));
        }
    });
</script>

<style>
    .tile {
        display: flex;
        flex-direction: column;
        background-color: lightsteelblue;
        margin: 5px;
        padding: 10px;
    }
    .tile-row-1 {
        display: flex;
        flex-direction: row;
        background-color: lightsteelblue;
    }
</style>