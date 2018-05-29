<template>
  <aside class="menu">
    <ul class="menu-list" v-for="(v, k) in facetFilter"
        v-if="facetFilter[`count-${k}`] !== 0
        && !(k.includes('count-'))
        && !(k.includes('origineCouple'))" v-bind:key="k">
        <facet-elements
          :queryField="queryField"
          :typeField="typeField"
          :facetFilter="facetFilter"
          :facetValue="v"
          :facetKey="k"/>
    </ul>
  </aside>
</template>

<script>
import FacetElements from './FacetElements';

export default {
  components: {
    FacetElements,
  },
  name: 'facet-search',
  props: ['facetFilter', 'queryField', 'typeField'],
};
</script>
