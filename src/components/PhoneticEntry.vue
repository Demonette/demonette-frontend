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

export default {
  name: 'table-entry',
  props: ['parentEl'],
  data() {
    return {
      el: this.parentEl,
      normLabel: {
        constructionPhonologique_1: 'Construction phonologique',
        rad: 'Radicale',
        construction_1: 'Construction',
        typeConstruction_1: 'Type de construction',
        constructionPhonologique_2: 'Construction phonologique',
        rad_2: 'Radicale',
        construction_2: 'Construction',
        typeConstruction_2: 'Type de construction',
        complexite: 'Complexité',
        relationPhonologiqueAbstraite: 'Relation phonologique abstraite',
        seqCommRad1Rad_2: 'Séquence commune des radicaux',
        relationPhonologieConcrete: 'Relation phonologie concrète',
        st_1: 'St',
        st_2: 'St',
      },
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
