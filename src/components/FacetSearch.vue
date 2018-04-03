<template>
  <aside class="menu">
    <ul class="menu-list" v-for="(v, k) in facetFilter"
        v-if="facetFilter[`count-${k}`] !== 0 && !(k.includes('count-'))" v-bind:key="k">
      <li>
        <a><strong>{{ k }}</strong> ({{ facetFilter[`count-${k}`].value }})</a>
        <ul>
          <li @click="addTag(Object.values(i.dedup_docs.hits.hits[0]._source)[0])"
              v-for="i in v.buckets" v-bind:key="i">
            <a :class="{'is-active':
                queryField.includes(Object.values(i.dedup_docs.hits.hits[0]._source)[0])}">
              {{ Object.values(i.dedup_docs.hits.hits[0]._source)[0] }} ({{ i.doc_count }})
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'facet-search',
  props: ['facetFilter', 'queryField'],
  methods: {
    addTag(el) {
      if (!this.queryField.includes(el)) {
        this.queryField.push(el);
      } else {
        this.queryField.splice(this.queryField.indexOf(el), 1);
      }
    },
  },
};
</script>

<style scoped>

</style>
