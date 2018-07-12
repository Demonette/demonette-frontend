<template>
  <div class="about">
    <institution class="institution"/>
    <institution class="institution"/>
    <institution class="institution"/>
  </div>
</template>

<script>
import { version } from '../../config/version-config';
import Institution from './Institution';

export default {
  components: { Institution },
  name: 'About',
  data() {
    return {
      appVersion: version[process.env.NODE_ENV],
    };
  },
};
</script>
<style scoped>
  .about {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
