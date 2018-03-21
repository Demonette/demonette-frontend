<template>
  <div class="columns">
    <div class="card-content column" v-for="(features, entity) in returnFormatRequest(el._source)">
      <table class="table is-bordered is-striped is-hoverable">
        <h1 class="title is-size-4">
          ·{{el._source[entity] ? el._source[entity] : entity }}·
        </h1>
        <tbody>
        <tr v-for="f in features">
          <th>{{ normLabel[f.name] }}</th>
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

export default {
  name: 'table-entry',
  props: ['parentEl'],
  data() {
    return {
      el: this.parentEl,
      normLabel: {
        type_1: 'type',
        cat_1: 'catégorie',
        constr_1: 'construction',
        type_constr_1: 'type de construction',
        type_2: 'type',
        cat_2: 'catégorie',
        constr_2: 'construction',
        type_constr_2: 'type de construction',
        complexite: 'complexité',
        orientation: 'orientation',
        def_conc: 'définition concrète',
        def_abs: 'définition abstraite',
      },
    };
  },
  methods: {
    returnFormatRequest(sourceEntry) { return formatRequest(sourceEntry); },
  },
};
</script>
