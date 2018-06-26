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
        typeSemantique_1: 'Type sémantique',
        categorie_1: 'Catégorie',
        construction_1: 'Construction',
        typeConstruction_1: 'Type de construction',
        typeSemantique_2: 'Type sémantique',
        categorie_2: 'Catégorie',
        construction_2: 'Construction',
        typeConstruction_2: 'Type de construction',
        complexite: 'Complexité',
        orientation: 'Orientation',
        definitionConcrete: 'Définition concrète',
        definitionAbstraite: 'Définition abstraite',
        tableFormat: {
          graph_1: [
            { name: 'typeSemantique_1' },
            { name: 'categorie_1' },
            { name: 'construction_1' },
            { name: 'typeConstruction_1' },
          ],
          graph_2: [
            { name: 'typeSemantique_2' },
            { name: 'categorie_2' },
            { name: 'construction_2' },
            { name: 'typeConstruction_2' },
          ],
          relation: [
            { name: 'complexite' },
            { name: 'orientation' },
            { name: 'definitionConcrete' },
            { name: 'definitionAbstraite' },
          ],
        },
      },
    };
  },
  methods: {
    returnFormatRequest(sourceEntry) { return formatRequest(sourceEntry); },
  },
};
</script>
