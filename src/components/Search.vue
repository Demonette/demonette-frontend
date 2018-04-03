<template>
  <div class="search">
    <div class="columns">
    <facet-search class="column is-2"
                  :facetFilter="facetFilter"
                  :queryField="queryField"
                  :typeField="typeField"/>
    <section class="column is-fluid">
      <b-field label="Rechercher :">
      <div class="dropdown is-active">
      <b-input icon="fa fa-search"
               v-model="autoQuery"
               @focus="showMenu = true"
               placeholder="rechercher ...">
      </b-input>
        <auto-complete-drop-down v-if="autoQuery.length !== 0"
          :showMenu="showMenu"
          :dropDownField="dropDownField"
          @clicked="autocomplete"/></div>
      </b-field>
      <b-field label="Tags utilisés pour la recherche :">
      <b-field grouped>
        <div class="control" v-for="(t,idx) in queryField">
        <b-taglist attached>
          <b-tag type="is-primary">{{ typeField[idx] }}</b-tag>
          <b-tag @close="removeTag(idx)"
                  closable>{{ t }}</b-tag>
        </b-taglist>
        </div>
      </b-field>
      </b-field>
    <hr/>
    <br/>
    <div class="container is-fluid">
      <div v-if="this.entry.length === 0">
        <p class="has-text-centered is-size-5">aucun résultat pour la recherche courante ...</p>
      </div>
      <div v-else-if="this.entry === '...'">
        <p class="has-text-centered is-size-4">{{ this.entry }}</p>
      </div>
      <div v-else>
        <collapse :entry="this.entry"/>
      </div>
    </div>
    </section>
  </div>
    <div v-if="this.entry.length !== 0">
      <hr/>
      <b-field grouped class="container">
        <b-field>
          <b-pagination
            :total=" total > 9900 ? 9900 : total"
            :current.sync="queryFrom"
            :per-page="querySize"
            :simple="false"
            size="is-small">
          </b-pagination>
        </b-field>
        <b-field>
          <p>Résultats par page: </p>
        </b-field>
        <b-field>
          <b-select v-model="querySize" size="is-small">
            <option value="5">5</option>
            <option selected value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </b-select>
        </b-field>
      </b-field>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import checkQueryField from '../methods/checkQueryField';
import Collapse from './Collapse';
import autocomplete from '../methods/autocomplete';
import CustomTagInput from './CustomTagInput';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import FacetSearch from './FacetSearch';

export default {
  components: {
    FacetSearch,
    AutoCompleteDropDown,
    CustomTagInput,
    Collapse,
  },
  name: 'Search',
  data() {
    return {
      autoQuery: '',
      entry: '',
      typeField: [],
      queryField: [],
      filteredTags: [],
      showMenu: false,
      querySize: 15,
      queryFrom: 1,
      total: 0,
      dropDownField: {},
      facetFilter: {},
    };
  },
  watch: {
    queryField() {
      checkQueryField(this.queryField, this.querySize, this.queryFrom)
        .then((res) => {
          this.entry = res.data;
          this.total = res.total;
          this.facetFilter = res.facet;
        });
    },
    autoQuery() {
      if (this.autoQuery !== '') {
        this.showMenu = true;
        this.debounceAutocomplete();
      } else {
        this.showMenu = false;
        this.dropDownField = {};
      }
    },
    queryFrom() {
      checkQueryField(
        this.queryField,
        this.querySize,
        ((this.queryFrom - 1) * this.querySize))
        .then((res) => {
          this.entry = res.data;
          this.total = res.total;
          this.facetFilter = res.facet;
        });
    },
    querySize() {
      checkQueryField(
        this.queryField,
        this.querySize,
        ((this.queryFrom - 1) * this.querySize))
        .then((res) => {
          this.entry = res.data;
          this.total = res.total;
          this.facetFilter = res.facet;
        });
    },
  },
  created() {
    checkQueryField(this.queryField, this.querySize, this.queryFrom)
      .then((res) => {
        this.entry = res.data;
        this.total = res.total;
        this.facetFilter = res.facet;
      });
  },
  methods: {
    debounceAutocomplete: _.debounce(function () {
      autocomplete(this.autoQuery)
        .then((data) => {
          this.dropDownField = data;
        });
    }, 100),
    autocomplete(el, key) {
      this.queryField.push(el);
      this.typeField.push(key);
      this.showMenu = false;
      this.autoQuery = '';
      this.selected = false;
    },
    removeTag(index) {
      this.queryField.splice(index, 1);
      this.typeField.splice(index, 1);
    },
  },
};
</script>
