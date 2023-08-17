<div class="app">
    <TabBar tabs={['Steaming Prices', 'Circula Reference Detection']} let:tab bind:active>
        <Tab stacked={true} {tab}>
            <Label>{tab}</Label>
        </Tab>
    </TabBar>
    {#if active === 'Steaming Prices'}
    <div class="toolbar">
        <CounterpartyPicker {counterparties} selectedCounterparty={counterparties[0]} id="counterpartyPicker"/>
        <div class="button-panel">
            <div class="spacer"></div>
            <div class="add-button">
                <EventButton id="addTile" label="New Tile" event={addNewTileEvent}/>
            </div>
        </div>
    </div>
    <div class="container">
        <TilesContainer id="tiles" addTileEvent={[{sourceId: 'addTile', event: addNewTileEvent}]}/>
    </div>
    <div class="bottom-panel">

    </div>
{:else if active === 'Circula Reference Detection'}
    <div class="circular-example-container">
        <div class="direct-example">
            <EventingComponent 
                id="componentA" 
                eventConsumed={[{event: testEventB}]} 
                eventProduced={testEventA}
            />
            <EventingComponent 
                id="componentB" 
                eventConsumed={[{event: testEventA}]} 
                eventProduced={testEventB}
            />
        </div>
        <div class="indirect-example">
            <EventingComponent 
                id="componentAA" 
                eventConsumed={[{event: testEventBB}]} 
                eventProduced={testEventAA}
            />
            <EventingComponent 
                id="componentBB" 
                eventConsumed={[{event: testEventAA}]} 
                eventProduced={testEventCC}
            />
            <EventingComponent 
                id="componentCC" 
                eventConsumed={[{event: testEventCC}]} 
                eventProduced={testEventBB}
            />
        </div>
    </div>
{/if}
</div>

<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import Paper, { Content } from '@smui/paper';
    import CounterpartyPicker from "./components/counterparty/CounterpartyPicker.svelte";
	import { CounterpartyService } from "./services/CounterpartyService";
	import { BeanLink } from "./BeanLink";
	import { registerAppEventHandlers } from "./app-event-handlers";
	import EventButton from "./components/button/EventButton.svelte";
	import TilesContainer from "./components/tiles/TilesContainer.svelte";
	import { addNewTileEvent } from "./components/tiles/types";
    import EventingComponent from './components/cycle/EventingComponent.svelte';
	import { testEventA, testEventAA, testEventB, testEventBB, testEventCC } from './components/cycle/types';


    const counterparties = CounterpartyService.getInstance().getCounterparties();
    const beanLink = BeanLink.getInstanceInContext('App'); // top level BeanLink instance
    registerAppEventHandlers(beanLink);

    let active:string = 'Steaming Prices';
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
        margin: 5px;
        background: rgb(209, 211, 213);
    }
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .bottom-panel {
        display: flex;
        flex-direction: column;
    }
    .circular-example-container {
        display: flex;
        flex-direction: column;
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
    .direct-example {
        display: flex;
    }
    .indirect-example {
        display: flex;
    }
</style>
