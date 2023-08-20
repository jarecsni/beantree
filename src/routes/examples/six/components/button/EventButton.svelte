<Button on:click={onClick} variant="raised" disabled={disabled}>
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';    
	import { BeanLink, type EventCreator } from '../../BeanLink';
	import type { BusEvent } from 'ts-bus/types';
	
    export let label:string;
    export let event:BusEvent;
    export let id:string
    export let disabled = false;

    const beanLink:BeanLink = BeanLink.getInstanceInContext();
    
    function onClick() {
        beanLink.publishEvent(id, event);
    }
</script>