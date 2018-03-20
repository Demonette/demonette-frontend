<template>
  <div class="search">

    <section class="panel-block">
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
        <div class="dropdown-menu" v-show="showMenu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <aside class="menu">
                <div v-for="(v, k) in dropDownField" v-if="v.length > 0" v-bind:key="k">
                  <p class="menu-label">
                    {{ k }}
                  </p>
                  <ul class="menu-list" >
                    <li v-for="el in v" v-bind:key="el">
                      <a v-on:click="autocomplete(el)">
                        {{ el }}
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
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
import Collapse from './Collapse';
import autocomplete from '../methods/autocomplete';
import CustomTagInput from './CustomTagInput';

export default {
  components: {
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
      dropDownField: {},
    };
  },
  watch: {
    queryField() {
      this.entry = '...';
      this.debounceQuery();
    },
    newTag() {
      if (this.newTag !== '') {
        this.debounceAutocomplete();
      } else {
        this.showMenu = false;
        this.dropDownField = {};
      }
    },
  },
  mounted() {
    this.$watch(
      () => {
        this.newTag = this.$refs.taginput.newTag;
      },
    );
  },
  methods: {
    debounceQuery: _.debounce(function () {
      query(this.queryField).then((data) => { this.entry = data; });
    }, 300),
    debounceAutocomplete: _.debounce(function () {
      autocomplete(this.newTag)
        .then((data) => {
          this.dropDownField = data;
        });
    }, 50),
    autocomplete(el) {
      this.queryField.push(el);
      this.$refs.taginput.newTag = '';
      this.showMenu = false;
      this.selected = false;
    },
  },
};
</script>
<style scoped>
  .dropdown-menu {
    min-width: 100%;
  }
  .dropdown-content {
    overflow: auto;
    max-height: 200px;
  }
</style>
