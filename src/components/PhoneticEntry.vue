<template>
  <div class="columns container is-fluid">
    <div class="card-content column" v-for="(features, entity) in
        returnFormatRequest(el._source)" :key="entity">
      <table class="table is-bordered is-striped is-hoverable" v-if="empty(features)">
        <h1 class="title is-size-6">
          {{el._source[entity] ? el._source[entity] : entity }}
        </h1>
        <tbody>
        <tr v-for="(f, idx) in features" :key="idx"
            v-if="f.value && Object.keys(nF).includes(f.name)">
          <th>{{ nF[f.name] }}</th>
          <td v-if="f.name !== 'st_2' && f.name !== 'st_1'">
            <b-tooltip :label="f.origin" position="is-right" animated
                       :active="f.origin !== undefined">
              {{ f.value }}
            </b-tooltip>
          </td>
          <td v-else>
            <b-tooltip :label="f.origin" position="is-right" animated
                       :active="f.origin !== undefined">
              <ul>
                <li v-for="(ste, index) in f.value.split(',')" :key="index">{{ ste }}</li>
              </ul>
            </b-tooltip>
          </td>
        </tr>
        </tbody>
      </table>
      <h1 class="title is-size-6 is-primary has-text-grey" v-else>
        {{el._source[entity] ? el._source[entity] : entity }}
      </h1>
    </div>
  </div>
</template>

<script>
import formatPhoneticRequest from '../methods/formatPhoneticRequest';
import normalizedFields from '../methods/normalizedFields';

export default {
  name: 'table-entry',
  props: ['parentEl'],
  data() {
    return {
      el: this.parentEl,
      nF: normalizedFields,
    };
  },
  methods: {
    returnFormatRequest(sourceEntry) { return formatPhoneticRequest(sourceEntry); },
    empty(feature) {
      return feature.reduce((acc, p) => 'value' in p && p.value !== '');
    },
  },
};
</script>
