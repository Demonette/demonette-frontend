<template>
  <div class="about">
  </div>
</template>

<script>
import { version } from '../../config/version-config';

export default {
  name: 'Footer-Demonette',
  data() {
    return {
      appVersion: version[process.env.NODE_ENV],
    };
  },
};
</script>
