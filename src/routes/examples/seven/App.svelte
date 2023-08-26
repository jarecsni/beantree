<div class="app">
    <TabBar tabs={['Steaming Prices', 'Circular Reference Detection']} let:tab bind:active>
        <Tab stacked={true} {tab}>
            <Label>{tab}</Label>
        </Tab>
    </TabBar>
    {#if active === 'Steaming Prices'}
    <div class="toolbar">
        <CounterpartyPicker 
            {counterparties} selectedCounterparty={counterparties[0]}
        />
        <div class="button-panel">
            <div class="spacer"/>
            <div class="add-button">
                <EventButton label="New Tile" buttonClicked={addNewTile}/>
            </div>
        </div>
    </div>
    <div class="container">
        <TilesContainer/>
    </div>
    <div class="bottom-panel">

    </div>
{:else if active === 'Circular Reference Detection'}
    <div class="circular-example-container">
        <!-- <div class="direct-example">
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
        </div> -->
    </div>
{/if}
</div>

<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import CounterpartyPicker from './components/counterparty/CounterpartyPicker.svelte';
	import { CounterpartyService } from './services/CounterpartyService';
	import { BeanLink } from './beanlink/BeanLink';
	import { Streamer } from './datastream/Streamer';
    import EventButton from './components/button/EventButton.svelte';
    import TilesContainer from './components/tiles/TilesContainer.svelte';
	import { counterpartyChanged } from './components/counterparty/types';
	import { BookingFeature } from './features/BookingFeature';
	import { FeatureManager } from './beanlink/FeatureManager';
	import { addNewTile } from './components/tiles/types';
    
    FeatureManager.instance.registerFeature(new BookingFeature());
    const counterparties = CounterpartyService.getInstance().getCounterparties();
    const { beanLink } = BeanLink.getInstance('App'); // top level BeanLink instance
    beanLink.on(counterpartyChanged, (event:ReturnType<typeof counterpartyChanged.event>) => {
        console.log('counterparty changed:', event.value && event.value.label);
    });
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
