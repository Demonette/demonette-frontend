<template>
  <div class="columns container is-fluid">
    <div class="card-content column" v-for="(features, entity) in
        returnFormatRequest(el._source)" :key="entity">
      <table class="table is-bordered is-striped is-hoverable">
        <h1 class="title is-size-6">
          {{el._source[entity] ? el._source[entity] : entity }}
        </h1>
        <tbody>
        <tr v-for="(f, idx) in features" :key="idx">
          <th>{{ nF[f.name] }}</th>
          <td>
            <b-tooltip :label="f.origin" position="is-right" animated
                       :active="f.origin !== undefined">
              {{ f.value }}
            </b-tooltip>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import formatRequest from '../methods/formatRequest';
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
    returnFormatRequest(sourceEntry) { return formatRequest(sourceEntry); },
  },
};
</script>
