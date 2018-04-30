<template>
    <b-collapse class="box" :key="el._id" :open="isImageModalActive" @open="open()">
      <div slot="trigger" slot-scope="props">
        <p class="is-size-5">
            <strong>{{el._source.graphie_1}}</strong> ·
            {{el._source.cat_1}} · {{el._source.type_1}} /
            <strong>{{el._source.graphie_2}}</strong> ·
            {{el._source.cat_2}} · {{el._source.type_2}}
          <br/>
          <small><i>ressource : {{el._source.ori_couple}}</i></small>
        </p>
        <br/>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
                  <span class="icon is-small"
                        :icon="props.open ? 'menu-down' : 'menu-up'" v-show="!props.open">
                    <i class="fas fa-angle-down"></i>
                  </span>
            </a>
          </div>
        </nav>
      </div>
      <b-tabs>
        <b-tab-item label="Table">
          <table-entry :parentEl="el"/>
        </b-tab-item>
        <b-tab-item label="Graph">
          <graph ref="graph" :element="el._source" :selected="selected"/>
        </b-tab-item>
      </b-tabs>
    </b-collapse>
</template>

<script>
import TableEntry from './TableEntry';
import Graph from './Graph';

export default {
  components: { TableEntry, Graph },
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
