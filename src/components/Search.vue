<template>
  <div class="search">
    <section class="columns container is-fluid">
      <aside class="menu column is-2">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a class="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
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
    };
  },
  watch: {
    queryField() {
      checkQueryField(this.queryField, this.querySize, this.queryFrom)
        .then((res) => { this.entry = res.data; this.total = res.total; });
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
        .then((res) => { this.entry = res.data; this.total = res.total; });
    },
    querySize() {
      checkQueryField(
        this.queryField,
        this.querySize,
        ((this.queryFrom - 1) * this.querySize))
        .then((res) => { this.entry = res.data; this.total = res.total; });
    },
  },
  created() {
    checkQueryField(this.queryField, this.querySize, this.queryFrom)
      .then((res) => { this.entry = res.data; this.total = res.total; });
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
  },
};
</script>
