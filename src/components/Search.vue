<template>
  <div class="search">
    <section class="panel-block">
        <b-taginput
          v-model="queryField"
          icon="tag"
          @typing="getFilteredTags"
          autocomplete
          allow-new
          :data="filteredTags"
          placeholder="ajouter un tag de recherche ...">
        </b-taginput>
    </section>
    <br/>
    <div class="container is-fluid">
      <div v-if="this.entry.length === 0">
        <p class="has-text-centered is-size-5">aucun résultat pour la recherche courante ...</p>
      </div>
      <div v-else-if="this.entry === '...'">
        <p class="has-text-centered is-size-4">{{ this.entry }}</p>
      </div>
      <div v-else>
        <collapse :parentEntry="this.entry"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import query from '../methods/query';
import Collapse from './Collapse';

export default {
  components: {
    Collapse,
  },
  name: 'Search',
  data() {
    return {
      entry: '',
      queryField: '',
      filteredTags: [],
    };
  },
  watch: {
    queryField() {
      this.entry = '...';
      this.debounceQuery();
    },
  },
  methods: {
    debounceQuery: _.debounce(function () {
      query(this.queryField.join(' ')).then((data) => { this.entry = data; });
    }, 300),
    getFilteredTags(text) {
      this.filteredTags = ['test', 'test1'].filter(
        option => option.toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0);
    },
  },
};
</script>
