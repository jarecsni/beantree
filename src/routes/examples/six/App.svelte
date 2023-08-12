<div class="app">
    <div class="toolbar">
        <CounterpartyPicker {counterparties} selectedCounterparty={counterparties[0]} id="counterpartyPicker"/>
        <div class="button-panel">
            <div class="spacer"></div>
            <div class="add-button">
                <EventButton id="addTile" label="New Tile" eventCreator={addNewTileEvent}/>
            </div>
        </div>
    </div>
    <div class="container">
        <TilesContainer id="tiles"/>
    </div>
    <div class="bottom-bar">Bottom Bar</div>
</div>

<script lang="ts">
	import { setContext } from "svelte";
    import CounterpartyPicker from "./components/counterparty/CounterpartyPicker.svelte";
	import { CounterpartyService } from "./services/CounterpartyService";
	import { BeanLink } from "./BeanLink";
	import { registerAppEventHandlers } from "./app-event-handlers";
	import EventButton from "./components/button/EventButton.svelte";
	import TilesContainer from "./components/tiles/TilesContainer.svelte";
	import { addNewTileEvent } from "./components/tiles/types";
    const counterparties = CounterpartyService.getInstance().getCounterparties();
    const beanLink = new BeanLink('App'); // top level BeanLink instance
    setContext('beanlink', beanLink);
    registerAppEventHandlers(beanLink);
</script>

<style>
    .app {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .toolbar {
        display: flex;
        padding: 10px;
        background: rgb(209, 211, 213);
    }
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .bottom-bar {
        display: flex;
    }
    .ticker {
        width: 200px;
    }
    .button-panel {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }
    .spacer {
        flex-grow: 1;
    }
    .add-button {
        align-self: center;
    }
</style>
