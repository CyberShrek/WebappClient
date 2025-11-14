<script lang="ts">

    export let
        image,
        hint: string = "",
        size: "auto"
            | "small"
            | "medium"
            | "large"
            = "auto"

</script>

<img src={image}
     title={hint}
     class={size}
     alt=""/>

<style>

    img.auto {
        width: 100%;
    }

    img.auto {
        height: max-content;
    }

    img.small {
        height: 20px;
    }

    img.medium {
        height: 25px;
    }

    img.large {
        height: 35px;
    }
</style>