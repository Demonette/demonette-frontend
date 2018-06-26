<template>
  <li>
    <a @click="toggle()">
      <strong>{{ normalizedTypeField[facetKey] }}</strong>
      ({{ facetFilter[`count-${facetKey}`].value }})
      <span v-show="isActive">
        <i class="fas fa-angle-up"></i>
      </span>
      <span v-show="!isActive">
        <i class="fas fa-angle-down"></i>
      </span>
    </a>
    <transition name="fade">
      <ul v-show="isActive">
        <li @click="addTag(facetKey, getSource(i))"
            v-for="i in facetValue.buckets"
            v-bind:key="getSource(i)">
          <a :class="{'is-active': queryField.includes(getSource(i))}"
             v-if="facetKey === 'relationPhonologiqueAbstraite'">
            {{ cSampaApiConverter(getSource(i)) }} ({{ i.doc_count }})
          </a>
          <a :class="{'is-active': queryField.includes(getSource(i))}" v-else>
            {{ getSource(i) }} ({{ i.doc_count }})
          </a>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
import sampaApiConverter from '../methods/sampaApiConverter';

export default {
  name: 'facet-elements',
  props: ['queryField', 'typeField', 'facetValue', 'facetKey', 'facetFilter'],
  data() {
    return {
      isActive: false,
      normalizedTypeField: {
        orientation: 'Orientation',
        complexite: 'Compléxite',
        categorie: 'Catégorie',
        construction: 'Construction',
        typeConstruction: 'Type de construction',
        typeSemantique: 'Type sémantique',
        graph: 'Graphie',
        definitionAbstraite: 'Définition abstraite',
        relationPhonologiqueAbstraite: 'Relation Phonologique Abstraite',
      },
    };
  },
  methods: {
    addTag(k, el) {
      if (!this.queryField.includes(el)) {
        this.queryField.push(el);
        this.typeField.push(this.normalizedTypeField[k]);
      } else {
        this.queryField.splice(this.queryField.indexOf(el), 1);
        this.typeField.splice(this.queryField.indexOf(el), 1);
      }
    },
    cSampaApiConverter(word) {
      return sampaApiConverter(word);
    },
    getSource(value) {
      // eslint-disable-next-line no-underscore-dangle
      return Object.values(value.dedup_docs.hits.hits[0]._source)[0];
    },
    toggle() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
