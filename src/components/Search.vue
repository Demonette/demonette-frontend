<template>
  <div class="search">
    <section class="container is-fluid">
      <b-field>
      <div class="dropdown is-active">
      <b-input icon="fa fa-search"
               v-model="autoQuery"
               @focus="showMenu = true"
               placeholder="rechercher ..."></b-input>
        <auto-complete-drop-down v-if="autoQuery.length !== 0"
          :showMenu="showMenu"
          :dropDownField="dropDownField"
          @clicked="autocomplete"/></div>
      </b-field>
      <b-field label="Tags :">
        <custom-tag-input
          @input="showMenu = false"
          @typing="showMenu = true"
          v-model="queryField">
        </custom-tag-input>
      </b-field>
    </section>
    <hr/>
    <br/>
    <div class="container is-fluid">
      <div v-if="this.queryField.length === 0">
      </div>
      <div v-else-if="this.entry.length === 0">
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
import autocomplete from '../methods/autocomplete';
import CustomTagInput from './CustomTagInput';
import AutoCompleteDropDown from './AutoCompleteDropDown';

export default {
  components: {
    AutoCompleteDropDown,
    CustomTagInput,
    Collapse,
  },
  name: 'Search',
  data() {
    return {
      autoQuery: '',
      entry: '',
      queryField: [],
      filteredTags: [],
      showMenu: false,
      newTag: '',
      dropDownField: {},
    };
  },
  watch: {
    queryField() {
      this.entry = '...';
      query(this.queryField
        .map(el => (el.split(': ')[1])))
        .then((data) => { this.entry = data; });
    },
    autoQuery() {
      if (this.autoQuery !== '') {
        this.debounceAutocomplete();
      } else {
        this.showMenu = false;
        this.dropDownField = {};
      }
    },
  },
  methods: {
    debounceAutocomplete: _.debounce(function () {
      autocomplete(this.autoQuery)
        .then((data) => {
          this.dropDownField = data;
        });
    }, 100),
    autocomplete(el, key) {
      this.queryField.push(`${key}: ${el}`);
      this.showMenu = false;
      this.autoQuery = '';
      this.selected = false;
    },
  },
};
</script>
