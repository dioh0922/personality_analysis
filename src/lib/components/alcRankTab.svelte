<script lang="ts">
  let { rankSave, beer } = $props();
  let rankData = $state<{id: number, label: string}[]>([]);

  $effect(() => {
    rankData = beer?.ranking 
    ? beer.ranking.map((item: string, index: number) => {
        return {id: index, label:item}
      })
    : [];

    if (
      draggingItemIndex != null &&
      hoveredItemIndex != null &&
      draggingItemIndex != hoveredItemIndex
    ) {
      // swap items
      const next = [...rankData];
      [next[draggingItemIndex], next[hoveredItemIndex]] = [
        next[hoveredItemIndex],
        next[draggingItemIndex],
      ];

      rankData = next;

      // balance
      draggingItemIndex = hoveredItemIndex;
    }

  });

  let mouseYCoordinate = $state<any>(null); // pointer y coordinate within client
  let distanceTopGrabbedVsPointer = $state<any>(null);

  let draggingItem = $state<any>(null);
  let draggingItemId = $state<any>(null);
  let draggingItemIndex = $state<any>(null);

  let hoveredItemIndex = $state<any>(null);

  let container = $state<any>(null);

</script>

<button on:click={() => rankSave(rankData)}>保存</button>

<div class="container" bind:this={container}>
  {#if mouseYCoordinate}
    <div
      class="item ghost"
      style="top: {mouseYCoordinate + distanceTopGrabbedVsPointer}px; background: gray;">
    {draggingItem.label}
    </div>
  {/if}

  {#each rankData as item, index}
    <div
    class="item {draggingItemId == item?.id ? 'invisible': ''}"
    style="background: {item?.label};"
    draggable="true"
    >
    {item?.id}位：{item?.label}
    </div>
  {/each}
</div>

<style>
    .container {
        padding: 10px;
    }

    .item {
        width: 300px;
        background: white;
        padding: 10px;
        margin-bottom: 10px;
        cursor: grab;
    }

    .ghost {
        margin-bottom: 10px;
        pointer-events: none;
        z-index: 99;
        position: absolute;
        top: 0;
        left: 10;
    }

    .invisible {
        opacity: 0;
    }
</style>
