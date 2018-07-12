<template>
    <div class="demonette-footer">
      <div class="is-pulled-right is-size-7 has-text-grey">
        Démonette/{{ version }} · ATILF [CNRS/UL] · 2018
      </div>
    </div>
</template>

<script>
const version = require('../../package.json').version;

export default {
  name: 'demonette-footer',
  data() {
    return {
      version,
    };
  },
};
</script>

<style scoped>
  .demonette-footer {
    margin-right: 0.5%;
    margin-bottom: 1%;
  }
</style>
