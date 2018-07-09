<template>
    <div class="demonette-footer">
      <div class="is-pulled-right is-size-7 has-text-grey">
        Démonette/{{ appVersion }} · ATILF [CNRS/UL] · 2018
      </div>
    </div>
</template>

<script>
import { version } from '../../config/version-config';

export default {
  name: 'demonette-footer',
  data() {
    return {
      appVersion: version[process.env.NODE_ENV],
    };
  },
};
</script>

<style scoped>
  .demonette-footer {
    margin-right: 0.5%;
    margin-top: 1%;
  }
</style>
