<template>
  <div class="search">
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="search" v-model="queryField">
        <span class="icon is-left">
            <i class="fas fa-search"></i>
          </span>
      </p>
    </div>
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
  components: { Collapse },
  name: 'Search',
  data() {
    return {
      entry: '',
      queryField: '',
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
      query(this.queryField).then((data) => { this.entry = data; });
    }, 300),
  },
};
</script>
