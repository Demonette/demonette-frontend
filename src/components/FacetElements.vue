<template>
  <li>
    <a @click="toggle()">
      <strong>{{ nF[facetKey] }}</strong>
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
import normalizedFields from '../methods/normalizedFields';

export default {
  name: 'facet-elements',
  props: ['queryField', 'typeField', 'facetValue', 'facetKey', 'facetFilter', 'valueField'],
  data() {
    return {
      isActive: false,
      nF: normalizedFields,
    };
  },
  methods: {
    addTag(k, el) {
      if (!this.queryField.includes(el)) {
        this.queryField.push(el);
        if (k === 'relationPhonologiqueAbstraite') {
          this.valueField.push(this.cSampaApiConverter(el));
        } else {
          this.valueField.push(el);
        }
        this.typeField.push(this.nF[k]);
      } else {
        this.queryField.splice(this.queryField.indexOf(el), 1);
        this.valueField.splice(this.queryField.indexOf(el), 1);
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
