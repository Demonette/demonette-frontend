<template>
    <div class="demonette-footer">
      <div>
        <br/>
        Demonette {{ appVersion }}
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

</style>
