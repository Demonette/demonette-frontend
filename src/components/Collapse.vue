<template>
    <b-collapse class="box" :key="el._id" :open="isImageModalActive" @open="open()">
      <div slot="trigger" slot-scope="props">
          <b-tooltip :label="`source: ${el._source.origineCouple}`" position="is-right" animated>
            <p class="is-size-6">
              <strong>{{el._source.graph_1}}</strong> ·
              {{el._source.categorie_1}} · {{el._source.typeSemantique_1}} /
              <strong>{{el._source.graph_2}}</strong> ·
              {{el._source.categorie_2}} · {{el._source.typeSemantique_2}}
            </p>
          </b-tooltip>
          <div class="level-left">
            <a class="level-item">
                  <span class="icon is-small"
                        :icon="props.open ? 'menu-down' : 'menu-up'" v-show="!props.open">
                    <i class="fas fa-angle-down"></i>
                  </span>
            </a>
          </div>
      </div>
      <b-tabs>
        <b-tab-item label="Table">
          <table-entry :parentEl="el"/>
        </b-tab-item>
        <b-tab-item label="Graph">
          <graph ref="graph" :element="el._source" :selected="selected"/>
        </b-tab-item>
        <b-tab-item label="Phonétique">
          <phonetic-entry :parentEl="el"/>
        </b-tab-item>
      </b-tabs>
    </b-collapse>
</template>

<script>
import TableEntry from './TableEntry';
import PhoneticEntry from './PhoneticEntry';
import Graph from './Graph';

export default {
  components: { TableEntry, Graph, PhoneticEntry },
  name: 'collapse',
  props: ['el'],
  data() {
    return {
      isImageModalActive: false,
      selected: false,
    };
  },
  methods: {
    open() {
      this.selected = true;
    },
  },
};
</script>
<style scoped>
  .box {
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 0.5%;
    margin-left: 0.5%;
    margin-top: 0.5%;
    width: 99%;
  }
</style>
