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
        <b-collapse class="box" v-for="el in entry" :key="el._id" :open="false">
          <div slot="trigger" slot-scope="props">
            <p>
              <strong class="is-size-3">
                {{el._source.graphie_1}}/{{el._source.graphie_2}} ·
              </strong>
              <small class="is-size-4">{{el._source.type_1}}/{{el._source.type_2}} </small>
              <br/>
              <small><i>ressource : {{el._source.ori_couple}}</i></small>
            </p>
            <br/>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small" :icon="props.open ? 'menu-down' : 'menu-up'">
                    <i class="is-size-4" v-show="!props.open">...</i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
          <div class="columns">
          <div class="card-content" v-for="(features, entity) in returnformatRequest(el._source)">
            <table class="table is-bordered is-striped is-hoverable column">
              <h1 class="title is-size-4">
                <strong>· {{el._source[entity] ? el._source[entity] : entity }} ·</strong>
              </h1>
              <tbody>
                <tr v-for="f in features">
                  <th>{{ f.name }}</th>
                  <td>{{ f.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import formatRequest from '../computed/formatRequest';
  import query from '../computed/query';

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
    returnformatRequest(sourceEntry) { return formatRequest(sourceEntry); },
    // eslint-disable-next-line func-names
    debounceQuery: _.debounce(function () {
      query(this.queryField).then((data) => { this.entry = data; });
    }, 300),
  },
};
</script>
