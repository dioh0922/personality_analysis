
<script lang="ts">
  import { onMount } from 'svelte';
  import {ref, get } from 'firebase/database'
  import db from '$lib/firebase'

  import Tabs from '$lib/components/tab.svelte'
  import alcSummary from '$lib/components/alcSummaryTab.svelte'
  import alcRank from '$lib/components/alcRankTab.svelte'


  let beer: any | null = null
  let items = [
    {
      label: "ビール傾向",
      value: 1,
      component: alcSummary
    },
    {
      label: "ビール順位",
      value: 2,
      component: alcRank
    }
  ]
  onMount(async () => {
    const snapshot = await get(ref(db, 'beer'))
    if(snapshot.exists()){
      beer = snapshot.val()
    }
  })

</script>

<Tabs {items} beer={beer}/>
