<script lang="ts">
  export let beer: any = null;
  let rankData: {id: number, label: string}[] = [];

  $: rankData = beer?.ranking
  ? beer.ranking.map((item: string, index: number) => {
    return {id: index, label:item}
  }):[];


  let mouseYCoordinate: any = null; // pointer y coordinate within client
  let distanceTopGrabbedVsPointer: any = null;

    let draggingItem: any = null;
    let draggingItemId: any = null;
    let draggingItemIndex: any = null;

    let hoveredItemIndex: any = null;

    $: {
        // prevents the ghost flickering at the top
        if (mouseYCoordinate == null || mouseYCoordinate == 0) {
            // showGhost = false;
        }
    }

    $: {
        if (
            draggingItemIndex != null &&
            hoveredItemIndex != null &&
            draggingItemIndex != hoveredItemIndex
        ) {
            // swap items
            [rankData[draggingItemIndex], rankData[hoveredItemIndex]] = [
                rankData[hoveredItemIndex],
                rankData[draggingItemIndex],
            ];

            // balance
            draggingItemIndex = hoveredItemIndex;
        }
    }

    let container = null;

</script>

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
    on:dragstart={(e:any) => {
      mouseYCoordinate = e.clientY;
      draggingItem = item;
      draggingItemIndex = index;
      draggingItemId = item.id;
      distanceTopGrabbedVsPointer = e.target.getBoundingClientRect().y - e.clientY;
    }}
    on:drag={(e:any) => {
      mouseYCoordinate = e.clientY;
    }}
    on:dragover={(e:any) => {
      hoveredItemIndex = index;
    }}
    on:dragend={(e:any) => {
      mouseYCoordinate = null;
      draggingItem = null;
      draggingItemIndex = null;
      draggingItemId = null;
    }}
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
