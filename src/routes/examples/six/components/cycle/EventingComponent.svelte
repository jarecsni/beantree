<div class="container">
    <EventButton 
        {id} 
        label={eventLabel} 
        event={testEvent}
        on:click={()=>{beanLink.publishEvent(id, testEvent({}))}}
    />
</div>

<script lang="ts">
	import { BeanLink, type EventCreator, type EventSource } from '../../BeanLink';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let testEventSource:EventSource;
    export let testEvent:EventCreator;
    const beanLink = BeanLink.getInstanceInContext();
    
    const event = testEvent({});
    const eventLabel = 'Produce event ' + event.type

    beanLink.subscribeToEventSource(testEventSource, { id, handleEvent: (e) => {
            beanLink.publishEvent(id, event);
        }
    });
</script>

<style>
    .container {
        margin-right: 5px;
    }
</style>