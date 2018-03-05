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
          <div class="card-content">
            <div class="content">
              <table>
                <tbody>
                <tr v-for="(value, key) in el._source" :key="value" v-if="value">
                  <td>{{ key }}</td>
                  <td>{{ value }}</td>
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
  import axios from 'axios';
  import _ from 'lodash';
  import { url } from '../../config/url-config';

  export default {
  name: 'Search',
  data() {
    return {
      entry: '',
      queryField: '',
      formatRequestKey: {},
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
    // eslint-disable-next-line func-names
    debounceQuery: _.debounce(function () { this.query(); }, 300),
  },
};
</script>
