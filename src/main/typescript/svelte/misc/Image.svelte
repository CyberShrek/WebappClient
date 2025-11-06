<script lang="ts">

    export let
        image,
        hint: string = ""

</script>

<img src={image}
     title={hint}
     alt=""/>

<style>
    img {
        width: 100%;
        height: 100%;
    }
</style>