<Textfield
    bind:value={property.value}
    type="date"
/>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import type { Property } from '../PropertyEditorTypes';
    export let property:Property<string>;
</script>