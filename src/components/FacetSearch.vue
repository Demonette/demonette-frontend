<template>
  <aside class="menu">
    <VuePerfectScrollbar class="facet" ref="ps" :settings="settings">
      <ul class="menu-list" v-for="(v, k) in facetFilter"
          v-if="facetFilter[`count-${k}`] !== 0
        && !(k.includes('count-'))
        && !(k.includes('origineCouple'))" v-bind:key="k">
        <facet-elements
          :queryField="queryField"
          :valueField="valueField"
          :typeField="typeField"
          :facetFilter="facetFilter"
          :facetValue="v"
          :facetKey="k"/>
      </ul>
    </VuePerfectScrollbar>
  </aside>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import FacetElements from './FacetElements';

export default {
  components: {
    FacetElements,
    VuePerfectScrollbar,
  },
  name: 'facet-search',
  props: ['facetFilter', 'queryField', 'typeField', 'valueField'],
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
      },
    };
  },
};
</script>
