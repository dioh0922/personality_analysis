
<script lang="ts">
  import { onMount } from 'svelte';
  import {ref, get } from 'firebase/database'
  import db from '$lib/firebase'

  let beer: any | null = null
  onMount(async () => {
    const snapshot = await get(ref(db, 'beer'))
    if(snapshot.exists()){
      beer = snapshot.val()
      console.log(snapshot.val())
    }
  })

</script>


<h3>{beer?.preference_type_definition?.summary}</h3>

<ul>
  <li>abv:{beer?.preferred_numeric_ranges?.abv}</li>
  <li>ibu:{beer?.preferred_numeric_ranges?.ibu}</li>
  <li>srm:{beer?.preferred_numeric_ranges?.srm}</li>
  <li>type:{beer?.preferred_numeric_ranges?.finish_type}</li>

</ul>
