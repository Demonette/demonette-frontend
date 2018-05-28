<template>
  <div class="columns container is-fluid">
    <div class="card-content column" v-for="(features, entity) in
        returnFormatRequest(el._source)" :key="entity">
      <table class="table is-bordered is-striped is-hoverable">
        <h1 class="title is-size-6">
          {{el._source[entity] ? el._source[entity] : entity }}
        </h1>
        <tbody>
        <tr v-for="(f, idx) in features" :key="idx"
            v-if="f.value && Object.keys(normLabel).includes(f.name)">
          <th>{{ normLabel[f.name] }}</th>
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
                <li v-for="ste in f.value.split(',')" :key="ste">{{ ste }}</li>
              </ul>
            </b-tooltip>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import formatPhoneticRequest from '../methods/formatPhoneticRequest';

export default {
  name: 'table-entry',
  props: ['parentEl'],
  data() {
    return {
      el: this.parentEl,
      normLabel: {
        constructionPhonologique_1: 'construction phonologique',
        rad: 'radicale',
        construction_1: 'construction',
        typeConstruction_1: 'type de construction',
        constructionPhonologique_2: 'construction phonologique',
        rad_2: 'radicale',
        construction_2: 'construction',
        typeConstruction_2: 'type de construction',
        complexite: 'complexité',
        relationPhonologiqueAbstraite: 'relation phonologique abstraite',
        seqCommRad1Rad_2: 'sequence commune des radicaux',
        relationPhonologieConcrete: 'relation phonologie concrete',
        st_1: 'st',
        st_2: 'st',
      },
    };
  },
  methods: {
    returnFormatRequest(sourceEntry) { return formatPhoneticRequest(sourceEntry); },
  },
};
</script>
