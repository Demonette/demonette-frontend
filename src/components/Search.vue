<template>
  <div class="search">
    <section class="columns container is-fluid">
      <aside class="menu column is-2">
        <ul class="menu-list" v-for="(v, k) in facetsFilter"
            v-if="facetsFilter[`count-${k}`] !== 0 && !(k.includes('count-'))">
          <li>
            <a><strong>{{ k }}</strong> ({{ facetsFilter[`count-${k}`].value }})</a>
            <ul>
              <li @click="addTag(Object.values(i.dedup_docs.hits.hits[0]._source)[0])"
                v-for="i in v.buckets">
                <a :class="{'is-active': queryField.includes(Object.values(i.dedup_docs.hits.hits[0]._source)[0])}">
                  {{ Object.values(i.dedup_docs.hits.hits[0]._source)[0] }} ({{ i.doc_count }})
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <div class="column container is-fluid">
        <b-field grouped>
          <b-field label="Rechercher">
            <div class="dropdown is-active">
              <custom-tag-input
                ref="taginput"
                @input="showMenu = false"
                @typing="showMenu = true"
                v-model="queryField"
                icon="tag"
                iconPack="fa"
                placeholder="ajouter un tag ...">
              </custom-tag-input>
              <auto-complete-drop-down :showMenu="showMenu"
                                       :dropDownField="dropDownField"
                                       @clicked="autocomplete"/>
            </div>
          </b-field>
        </b-field>
        <br/>
        <div>
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
      </div>
    </section>
    <div class="" v-if="this.entry.length !== 0">
      <hr/>
      <b-field class="container is-fluid" grouped>
        <b-field>
          <b-pagination
            class="container is-fluid"
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

export default {
  components: {
    AutoCompleteDropDown,
    CustomTagInput,
    Collapse,
  },
  name: 'Search',
  data() {
    return {
      entry: '',
      queryField: [],
      filteredTags: [],
      showMenu: false,
      newTag: '',
      querySize: 15,
      queryFrom: 1,
      total: 0,
      dropDownField: {},
      facetsFilter: {},
    };
  },
  watch: {
    queryField() {
      checkQueryField(this.queryField, this.querySize, this.queryFrom)
        .then((res) => {
          this.entry = res.data;
          this.total = res.total;
          this.facetsFilter = res.facet;
        });
    },
    newTag() {
      if (this.newTag !== '') {
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
          this.facetsFilter = res.facet;
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
          this.facetsFilter = res.facet;
        });
    },
  },
  created() {
    checkQueryField(this.queryField, this.querySize, this.queryFrom)
      .then((res) => {
        this.entry = res.data;
        this.total = res.total;
        this.facetsFilter = res.facet;
      });
  },
  mounted() {
    this.$watch(
      () => {
        this.newTag = this.$refs.taginput.newTag;
      },
    );
  },
  methods: {
    debounceAutocomplete: _.debounce(function () {
      autocomplete(this.newTag)
        .then((data) => {
          this.dropDownField = data;
        });
    }, 100),
    autocomplete(el) {
      this.queryField.push(el);
      this.$refs.taginput.newTag = '';
      this.showMenu = false;
      this.selected = false;
    },
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
