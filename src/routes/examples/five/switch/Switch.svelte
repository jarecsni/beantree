
<Switch bind:checked={value} on:SMUISwitch:change={onChange} />

<script lang="ts">
    import Switch from '@smui/switch';
    let value = false;
    const onChange = (e:CustomEvent) => {
        console.log(e.detail.selected);
    }
</script>