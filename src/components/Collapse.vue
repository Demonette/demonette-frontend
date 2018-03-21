<template>
  <div>
    <b-collapse class="box" v-for="el in entry" :key="el._id" :open="false">
      <div slot="trigger" slot-scope="props">
        <p>
          <strong class="is-size-3">
            {{el._source.graphie_1}}/{{el._source.graphie_2}} ·
          </strong>
          <small class="is-size-4">{{el._source.type_1}}/{{el._source.type_2}} </small>
          <br/>
          <small><i>ressource : {{el._source.ori_couple}}</i></small>
        </p>
        <br/>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
                  <span class="icon is-small" :icon="props.open ? 'menu-down' : 'menu-up'">
                    <i class="is-size-4" v-show="!props.open">...</i>
                  </span>
            </a>
          </div>
        </nav>
      </div>
      <table-entry class="container" :parentEl="el"/>
    </b-collapse>
  </div>
</template>

<script>
import TableEntry from './TableEntry';

export default {
  components: { TableEntry },
  name: 'collapse',
  props: ['parentEntry'],
  data() {
    return {
      entry: this.parentEntry,
    };
  },
};
</script>
