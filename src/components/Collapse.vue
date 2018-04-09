<template>
  <div>
    <b-collapse class="box" v-for="el in entry" :key="el._id" :open="isImageModalActive">
      <div slot="trigger" slot-scope="props">
        <p>
          <strong class="is-size-4">
            {{el._source.graphie_1}}/{{el._source.graphie_2}} ·
          </strong>
          <small class="is-size-4">
            {{el._source.type_1}}/{{el._source.type_2}}
          </small>
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
      <b-tabs v-model="activeTab">
        <b-tab-item label="Table">
          <table-entry :parentEl="el"/>
        </b-tab-item>
        <b-tab-item label="Graph" :element="el">
          <graph></graph>
        </b-tab-item>
      </b-tabs>
    </b-collapse>
  </div>
</template>

<script>
import TableEntry from './TableEntry';
import Graph from './Graph';

export default {
  components: { TableEntry, Graph },
  name: 'collapse',
  props: ['entry'],
  data() {
    return {
      isImageModalActive: false,
    };
  },
};
</script>
