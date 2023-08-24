<Button on:click={onClick} variant="raised" disabled={disabled}>
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';    
	import { BeanLink } from '../../BeanLink';
	import type { BusEvent } from 'ts-bus/types';
	import { buttonClicked } from './types';
	
    export let label:string;
    export let name:string
    export let disabled = false;

    const beanLink:BeanLink = BeanLink.getInstance().beanLink;
    
    function onClick() {
        beanLink.publish(buttonClicked(name));
    }
</script>