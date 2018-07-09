<template>
  <transition name="fade" mode="out-in">
    <div :key="entry[0]._id">
        <collapse v-for="el in entry" :el="el" v-bind:key="el._id"/>
    </div>
  </transition>
</template>

<script>
import Collapse from './Collapse';

export default {
  components: { Collapse },
  name: 'collapse-group',
  props: ['entry'],
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
