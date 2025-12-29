<script lang="ts">
  export let beer: any = null;
  $: rankData = beer?.ranking;
</script>

<ul>
  {#each rankData as item, index}
    <li>{index + 1}：{item}</li>
  {/each}
</ul>

