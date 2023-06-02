<Switch bind:checked={property.value} icons={false} />

<script lang="ts">
    import Switch from '@smui/switch';
	import type { Property } from '../PropertyEditorTypes';
    export let property:Property;
</script>