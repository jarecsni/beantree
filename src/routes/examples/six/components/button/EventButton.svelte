<Button on:click={onClick} variant="raised">
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';    
	import { BeanLink, type EventCreator } from '../../BeanLink';
	
    export let label:string;
    export let event:EventCreator;
    export let id:string

    const beanLink:BeanLink = BeanLink.getInstanceInContext();
    const eventToFire = event({sourceId: id});

    function onClick() {
        beanLink.publishEvent(id, eventToFire);
    }
</script>