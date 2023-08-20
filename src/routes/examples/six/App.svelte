<div class="app">
    <TabBar tabs={['Steaming Prices', 'Circular Reference Detection']} let:tab bind:active>
        <Tab stacked={true} {tab}>
            <Label>{tab}</Label>
        </Tab>
    </TabBar>
    {#if active === 'Steaming Prices'}
    <div class="toolbar">
        <CounterpartyPicker 
            id="counterpartyPicker"
            {counterparties} 
            selectedCounterparty={counterparties[0]} 
        />
        <div class="button-panel">
            <div class="spacer"/>
            <div class="add-button">
                <EventButton id="addTile" label="New Tile" event={addNewTileEvent}/>
            </div>
        </div>
    </div>
    <div class="container">
        <TilesContainer id="tiles" addTileEventSource={[{sourceId: 'addTile', eventCreator: addNewTileEvent, event: addNewTileEvent.eventType}]}/>
    </div>
    <div class="bottom-panel">

    </div>
{:else if active === 'Circular Reference Detection'}
    <div class="circular-example-container">
        <div class="direct-example">
            <EventingComponent 
                id="componentA" 
                testEventSource={[{event: testEventB.eventType, eventCreator: testEventB}]} 
                testEvent={testEventA}
            />
            <EventingComponent 
                id="componentB" 
                testEventSource={[{event: testEventA.eventType, eventCreator: testEventA}]} 
                testEvent={testEventB}
            />
        </div>
        <div class="indirect-example">
            <EventingComponent 
                id="componentAA" 
                testEventSource={[{event: testEventBB.eventType, eventCreator: testEventBB}]} 
                testEvent={testEventAA}
            />
            <EventingComponent 
                id="componentBB" 
                testEventSource={[{event: testEventAA.eventType, eventCreator: testEventAA}]} 
                testEvent={testEventCC}
            />
            <EventingComponent 
                id="componentCC" 
                testEventSource={[{event: testEventCC.eventType, eventCreator: testEventCC}]} 
                testEvent={testEventBB}
            />
        </div>
    </div>
{/if}
</div>

<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import CounterpartyPicker from './components/counterparty/CounterpartyPicker.svelte';
	import { CounterpartyService } from './services/CounterpartyService';
	import { BeanLink } from './BeanLink';
	import { registerAppEventHandlers } from './app-event-handlers';
	import EventButton from './components/button/EventButton.svelte';
	import TilesContainer from './components/tiles/TilesContainer.svelte';
	import { addNewTileEvent } from './components/tiles/types';
    import EventingComponent from './components/cycle/EventingComponent.svelte';
	import { testEventA, testEventAA, testEventB, testEventBB, testEventCC } from './components/cycle/types';
	import { Streamer } from './datastream/Streamer';
    import { BookingFeature } from './features/BookingFeature';
	import { FeatureManager } from './features/FeatureManager';
    const counterparties = CounterpartyService.getInstance().getCounterparties();
    const beanLink = BeanLink.getInstanceInContext('App'); // top level BeanLink instance
    registerAppEventHandlers(beanLink);
    FeatureManager.instance.registerFeature(new BookingFeature());
    Streamer.getInstance().startStreaming();
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
        padding: 10px;
        margin: 5px;
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
        margin: 5px;

    }
    .indirect-example {
        display: flex;
        margin: 5px;
    }
</style>
