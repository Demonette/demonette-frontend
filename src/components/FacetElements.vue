<template>
  <ul>
    <li @click="addTag(facetKey, getSource(i))"
        v-for="i in facetValue.buckets"
        v-bind:key="getSource(i)">
      <a :class="{'is-active': queryField.includes(getSource(i))}">
        {{ getSource(i) }} ({{ i.doc_count }})
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'facet-elements',
  props: ['queryField', 'typeField', 'facetValue', 'facetKey'],
  methods: {
    addTag(k, el) {
      if (!this.queryField.includes(el)) {
        this.queryField.push(el);
        this.typeField.push(k);
      } else {
        this.queryField.splice(this.queryField.indexOf(el), 1);
        this.typeField.splice(this.queryField.indexOf(el), 1);
      }
    },
    getSource(value) {
      // eslint-disable-next-line no-underscore-dangle
      return Object.values(value.dedup_docs.hits.hits[0]._source)[0];
    },
  },
};
</script>
