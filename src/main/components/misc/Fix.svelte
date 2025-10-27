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
    }
    .fix:hover {
        opacity: 1;
    }
    .fix.top    { top:    var(--strong-indent) }
    .fix.bottom { bottom: var(--strong-indent) }
    .fix.right   { left:   var(--strong-indent) }
    .fix.right  { right:  var(--strong-indent) }

    .fix.framed {
        flex-wrap: wrap;
        color: var(--primary-color);
        padding: var(--indent);
        background: var(--secondary-color);
        border: 5px solid var(--primary-color);
        border-radius: var(--border-radius);
    }
    .fix p{
        margin: auto var(--indent) auto 0;
    }

    .fix button {
        height: 35px;
        width: 35px;
    }
</style>