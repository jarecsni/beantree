<Textfield 
    bind:value={property.value} 
    type="number" 
/>

<script lang="ts">
	import Textfield from '@smui/textfield';
    export let property:Property;
</script>