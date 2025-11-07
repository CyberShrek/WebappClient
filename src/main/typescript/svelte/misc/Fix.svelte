<script lang="ts">

    import { fade } from 'svelte/transition'

    export let
        framed: boolean = false,
        top    = false,
        bottom = false,
        left   = false,
        right  = false

</script>

<div class="fix"
     class:framed
     class:top
     class:bottom
     class:left
     class:right
     transition:fade>

    <slot/>
</div>

<style>
    .fix {
        display: flex;
        opacity: 0.6;
        position: fixed;
        z-index: 64;
        box-shadow: var(--shadow);
        transition:  opacity 0.3s;
        width: min-content;
    }
    .fix:hover {
        opacity: 1;
    }
    .fix.bottom { top:  auto; }
    .fix.top    { top:  0;    }
    .fix.left   { left: 0;    }
    .fix.right  { left: auto; }

    .fix.framed {
        flex-wrap: wrap;
        color: var(--primary-color);
        padding: var(--indent);
        background: var(--secondary-color);
        border: 5px solid var(--primary-color);
        border-radius: var(--border-radius);
    }
</style>