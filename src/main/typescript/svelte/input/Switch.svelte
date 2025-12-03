<script lang="ts">

    export let
        checked: boolean | null = false,
        title: string = "",
        type: "checkbox" | "switch" = "switch"

    $: if (checked == null)
        checked = false

</script>

<label class={type}>
    <input type="checkbox"
           bind:checked
           on:change>
    {#if type === "switch"}
        <span class="slider"></span>
    {/if}
    {title}
</label>

<style>
    :root {
        --switch-width: 40px;
        --switch-height: 24px;
    }

    label {
        gap: var(--indent);
        cursor: pointer;
    }

    label.switch {
        display: flex;
        font-size: large;
        min-width: min-content;
        max-width: max-content;
        justify-content: start;
        align-items: center;
    }

    label.switch input {
        display: none;
    }

    label.switch .slider {
        cursor: pointer;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: var(--switch-height);
        width: var(--switch-width);
        height: var(--switch-height);
        transform: translateX(0);
    }

    label.switch .slider:before {
        position: absolute;
        content: "";
        height: calc(var(--switch-height) - 6px);
        width: calc(var(--switch-height) - 6px);
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .2s;
        border-radius: 50%;
    }
    label.switch input:hover + .slider {
        background: var(--secondary-color);
    }

    label.switch input:checked + .slider {
        background-color: var(--accent-color);
    }

    label.switch input:focus + .slider {
        box-shadow: 0 0 1px var(--accent-color);
    }

    label.switch input:checked + .slider:before {
        transform: translateX(calc(var(--switch-width) - var(--switch-height)));
    }
</style>