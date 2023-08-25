
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
            <IconButton class="material-icons" on:click={()=>{onCloseTile()}}>close</IconButton>
        </div>
    </div>
    <div class="price">
        <PriceLabel/>
    </div>
    <div class="buttons">
        <EventButton label="Book" 
            disabled={disabled} 
            buttonClicked={bookDealButtonClicked}
        />
    </div>
</div>

<script lang="ts">
    import IconButton from '@smui/icon-button';
	import { BeanLink } from '../../BeanLink';
	import Select, { Option } from '@smui/select';
	import { Streamer } from '../../datastream/Streamer';
	import { 
        closeTile as _closeTile, 
        symbolChanged as _symbolChanged, 
        bookDeal, 
        priceLabelSetValue as _priceLabelSetValue, 
        priceTickReceived as _priceTickReceived,
		setBookButtonEnabled as _setBookButtonEnabled,
		bookDealButtonClicked
    } from './types';
	import PriceLabel from './PriceLabel.svelte';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let closeTile = _closeTile;
    export let symbolChanged = _symbolChanged;
    export let priceLabelSetValue = _priceLabelSetValue;
    export let setBookButtonEnabled = _setBookButtonEnabled;
    export let priceTickReceived = _priceTickReceived;
    export let selectedSymbol = '';

    const { beanLink, parentBeanLink } = BeanLink.getInstance('Tile');

    let symbols = Streamer.getInstance().getSymbols();
    let price = 0;
    let disabled = false;

    function onCloseTile() {
        parentBeanLink.publish(closeTile.event(id));
    }

    $: {
        parentBeanLink.publish(symbolChanged.event({id, symbol: selectedSymbol}));        
    }

    parentBeanLink.on(priceTickReceived, (event: ReturnType<typeof priceTickReceived.event>)=> {
        if (event.value.symbol === selectedSymbol) {
            // FIXME this is not nice to filter like this - need to be able to filter earlier on
            price = event.value.value;
            beanLink.publish(priceLabelSetValue.event(price));
        }
    });

    beanLink.on(setBookButtonEnabled,
        (event: ReturnType<typeof setBookButtonEnabled.event>)=> {
            disabled = !event.value;
        }
    );

    beanLink.on(bookDealButtonClicked, () => {
        // TODO why it will cause stack overflow if I use beanLink instead of parent
        beanLink.publish(bookDeal.event({symbol: selectedSymbol, value: price}));
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