<template>
  <div class="institution">
    <h1 class="is-size-5">{{ name }}</h1>
    <p class="has-text-justified">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'institution',
  props: ['name', 'content'],
};

</script>
