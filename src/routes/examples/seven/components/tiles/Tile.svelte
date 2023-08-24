
<div class="tile">
    <div class="tile-row-1">
        <div>
            <Select bind:value={selectedSymbol} label="Symbol">
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
        <PriceLabel/>
    </div>
    <div class="buttons">
        <EventButton label="Book" disabled={disabled} name="bookDeal"/>
    </div>
</div>

<script lang="ts">
    import IconButton from '@smui/icon-button';
	import { BeanLink } from '../../BeanLink';
	import Select, { Option } from '@smui/select';
	import { Streamer } from '../../datastream/Streamer';
	import { 
        closeTileEvent, 
        symbolChangedEvent, 
        bookDealEvent, 
        priceLabelSetValue, 
        priceTickReceivedEvent,
		setBookButtonEnabled
    } from './types';
	import PriceLabel from './PriceLabel.svelte';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let closeTileEventName = 'closeTile';
    export let symbolChangedEventName = 'symbolChanged';
    export let priceLabelSetValueName = 'priceLabelSetValue';
    export let setBookButtonEnabledName = 'setBookButtonEnabled';
    export let priceTickReceivedName = 'priceTickReceived';
    export let selectedSymbol = '';

    const { beanLink, parentBeanLink } = BeanLink.getInstance('Tile');

    let symbols = Streamer.getInstance().getSymbols();
    let price = 0;
    let disabled = false;

    function closeTile() {
        parentBeanLink.publish(closeTileEvent(closeTileEventName, id));
    }

    $: {
        parentBeanLink.publish(symbolChangedEvent(symbolChangedEventName, {id, symbol: selectedSymbol}));        
    }

    parentBeanLink.on(priceTickReceivedName, (event: ReturnType<typeof priceTickReceivedEvent>)=> {
        price = event.value.value;
        beanLink.publish(priceLabelSetValue(priceLabelSetValueName, price));
    });

    beanLink.on(setBookButtonEnabledName,
        (event: ReturnType<typeof setBookButtonEnabled>)=> {
            disabled = !event.value;
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