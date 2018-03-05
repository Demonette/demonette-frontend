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
    <p>{{ this.entry }}</p>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import { url } from '../../config/url-config';

  export default {
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
    query() {
      if (!this.queryField) {
        this.entry = '';
      } else {
        axios.get(`${url[process.env.NODE_ENV]}/search?token=${this.queryField}`)
          .then((response) => {
            this.entry = response.data;
          })
          .catch(() => {
            this.entry = 'pas de résultat pour la recherche courante ...';
          });
      }
    },
    debounceQuery: _.debounce(this.query(), 300),
  },
};
</script>
