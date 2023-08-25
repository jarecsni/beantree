<Button on:click={onClick} variant="raised" disabled={disabled}>
    <Label>{label}</Label>
</Button>

<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';    
	import { BeanLink, type BeanLinkEvent, type BeanLinkEventCreator } from '../../BeanLink';
	
    export let label:string;
    export let buttonClicked:BeanLinkEventCreator<boolean>;
    export let disabled = false;

    const beanLink:BeanLink = BeanLink.getInstance().beanLink;
    
    function onClick() {
        beanLink.publish(buttonClicked.event(true));
    }
</script>