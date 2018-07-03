<template>
  <div class="search">
    <div class="columns">
      <facet-search class="column is-2"
                    :facetFilter="facetFilter"
                    :queryField="queryField"
                    :valueField="valueField"
                    :typeField="typeField"/>
      <div class="divider is-fluid"></div>
      <section class="column is-fluid searchbar">
        <div class="is-fluid">
          <div class="dropdown is-active">
            <b-input icon="fa fa-search"
                     v-model="autoQuery"
                     @focus="showMenu = true"
                     placeholder="rechercher ...">
            </b-input>
            <auto-complete-drop-down v-if="autoQuery.length !== 0"
                                     :autoQuery="autoQuery"
                                     :showMenu="showMenu"
                                     :dropDownField="dropDownField"
                                     @clicked="autocomplete"/>
          </div>
          <b-dropdown hoverable>
            <button class="button is-primary" slot="trigger">
              <span>sources</span>
              <b-icon icon="fas fa-angle-down"></b-icon>
            </button>
            <b-dropdown-item v-for="o in origin"
                          :key="o">
                <div class="field">
                  <b-checkbox v-model="originFilter" :native-value="o">{{ o }}</b-checkbox>
                </div>
            </b-dropdown-item>
          </b-dropdown>
        <div class="is-pulled-right pagination-content">
          <b-field grouped>
          <b-pagination
            :total=" total > 9900 ? 9900 : total"
            :current.sync="queryFrom"
            :per-page="querySize"
            :simple="false"
            size="is-small">
          </b-pagination>
            <p>&nbsp; Résultats par page: &nbsp;</p>
            <b-select v-model="querySize" size="is-small">
              <option selected value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </b-select>
          </b-field>
        </div>
        </div>
        <br/>
        <b-field grouped label="Filtre(s):" :v-show="queryField.length !== 0"> &nbsp;
            <div class="control" v-for="(t,idx) in valueField" :key="t">
              <b-taglist attached>
                <b-tag type="is-primary">{{ typeField[idx] }}</b-tag>
                <b-tag @close="removeTag(idx)"
                       closable>{{ t }}</b-tag>
              </b-taglist>
            </div>
          </b-field>
          <div v-if="this.entry.length === 0">
            <p class="has-text-centered is-size-5">aucun résultat pour la recherche courante ...</p>
          </div>
          <div v-else-if="this.entry === '...'">
            <p class="has-text-centered is-size-4">{{ this.entry }}</p>
          </div>
          <div class="flex-container" v-else>
            <VuePerfectScrollbar ref='ps' :settings="settings">
              <collapse-group class="collapse-group" :entry="this.entry"/>
            </VuePerfectScrollbar>
          </div>
      </section>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import checkQueryField from '../methods/checkQueryField';
import CollapseGroup from './CollapseGroup';
import autocomplete from '../methods/autocomplete';
import source from '../methods/sourceRequest';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import FacetSearch from './FacetSearch';

export default {
  components: {
    FacetSearch,
    AutoCompleteDropDown,
    CollapseGroup,
    VuePerfectScrollbar,
  },
  name: 'Search',
  data() {
    return {
      autoQuery: '',
      entry: '',
      typeField: [],
      queryField: [],
      valueField: [],
      filteredTags: [],
      showMenu: false,
      querySize: 15,
      queryFrom: 1,
      total: 0,
      dropDownField: {},
      facetFilter: {},
      originFilter: [],
      origin: [],
      settings: {
        maxScrollbarLength: 60,
      },
    };
  },
  watch: {
    queryField() {
      this.queryFrom = 1;
      this.request();
      const ps = this.$refs.ps;
      ps.$el.scrollTop = 0;
      ps.update();
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
      this.request();
    },
    querySize() {
      this.request();
    },
    originFilter() {
      this.request();
    },
  },
  beforeMount() {
    this.request();
    source().then((res) => {
      this.originFilter = res.data.aggregations.origin.buckets.map(el => el.key);
      this.origin = res.data.aggregations.origin.buckets.map(el => el.key);
    });
  },
  methods: {
    request() {
      checkQueryField(this.queryField,
        this.querySize, ((this.queryFrom - 1) * this.querySize), this.originFilter)
        .then((res) => {
          this.entry = res.data;
          this.total = res.total;
          this.facetFilter = res.facet;
        });
    },
    debounceAutocomplete: _.debounce(function () {
      autocomplete(this.autoQuery)
        .then((data) => {
          this.dropDownField = data;
        });
    }, 100),
    autocomplete(el, key) {
      this.queryField.push(el);
      this.valueField.push(el);
      this.typeField.push(key);
      this.showMenu = false;
      this.autoQuery = '';
      this.selected = false;
    },
    removeTag(index) {
      this.queryField.splice(index, 1);
      this.typeField.splice(index, 1);
      this.valueField.splice(index, 1);
    },
  },
};
</script>
<style scoped>
  .divider {
    width: 1px;
    background: black;
    opacity: 0.10;
    min-height: 100vh;
  }
  .flex-container {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    height: 80vh;
  }
  .collapse-group {
    position:relative;
  }
  .pagination-content{
    margin-right: 1%;
  }
</style>
