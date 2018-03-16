<template>
  <div class="search">

    <section class="panel-block">
      <div class="dropdown is-4" :class="{'is-hoverable': showMenu }" @keyup.enter="showMenu = false" >
      <b-taginput
        @blur="showMenu = false"
          @input="showMenu = false"
          @typing="showMenu = true"
          v-model="queryField"
          icon="tag"
          placeholder="ajouter un tag ...">
        </b-taginput>
        <div class="dropdown-menu" @click="showMenu = false" @blur="showMenu = false">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
            </div>
          </div>
        </div>
      </div>
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
import autocomplete from '../methods/autocomplete';
import Collapse from './Collapse';

export default {
  components: {
    Collapse,
  },
  name: 'Search',
  data() {
    return {
      entry: '',
      queryField: [],
      filteredTags: [],
      showMenu: false,
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
    getFilteredTags(token) {
      autocomplete(token, 'type_1').then((res) => { this.filteredTags = res; });
    },
  },
};
</script>
