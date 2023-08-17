<div class="container">
    <EventButton 
        {id} 
        label={eventLabel} 
        producedEvent_ButtonEvent={producedEvent_TestEvent}
        on:click={()=>{beanLink.publishEvent(id, producedEvent_TestEvent({}))}}
    />
</div>

<script lang="ts">
	import { BeanLink, type EventCreator, type EventSource } from '../../BeanLink';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let consumedEventSource_TestEventSource:EventSource;
    export let producedEvent_TestEvent:EventCreator;
    const beanLink = BeanLink.getInstanceInContext();
    
    const event = producedEvent_TestEvent({});
    const eventLabel = 'Produce event ' + event.type

    beanLink.subscribeToEventSource(consumedEventSource_TestEventSource, { id, handleEvent: (e) => {
            beanLink.publishEvent(id, event);
        }
    });
</script>

<style>
    .container {
        margin-right: 5px;
    }
</style>