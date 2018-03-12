<template>
  <div>
    <div class="card-content" v-for="(features, entity) in returnFormatRequest(el._source)">
      <table class="table is-bordered is-striped is-hoverable column">
        <h1 class="title is-size-4">
          <strong>· {{el._source[entity] ? el._source[entity] : entity }} ·</strong>
        </h1>
        <tbody>
        <tr v-for="f in features">
          <th>{{ f.name }}</th>
          <td>{{ f.value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import formatRequest from '../methods/formatRequest';

  export default {
  name: 'table-entry',
  props: ['parentEl'],
  data() {
    return {
      el: this.parentEl,
    };
  },
  methods: {
    returnFormatRequest(sourceEntry) { return formatRequest(sourceEntry); },
  },
};
</script>
