<template>
  <div class="dropdown-menu" v-show="showMenu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <aside class="menu" v-if="empty()">
          <div v-for="(v, k) in dropDownField" v-bind:key="k" v-if="v.length > 0">
            <p class="menu-label">
              {{ nF[k] }} ({{ v.length }})
            </p>
            <ul class="menu-list">
              <li v-for="el in v" v-bind:key="el">
                <a v-on:click="onClick(el,k)">
                  <b>{{ el.slice(0, autoQuery.length) }}</b>{{ el.slice(autoQuery.length)}}
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <p v-else>aucun résultat ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import normalizedFields from '../methods/normalizedFields';

export default {
  name: 'auto-complete-drop-down',
  props: ['showMenu', 'dropDownField', 'autoQuery'],
  data() {
    return {
      nF: normalizedFields,
    };
  },
  methods: {
    empty() {
      let cpt = 0;
      Object.keys(this.dropDownField)
        .forEach((k) => { cpt += this.dropDownField[k].length; });
      return (cpt > 0);
    },
    onClick(element, key) {
      this.$emit('clicked', element, key);
    },
  },
};
</script>

<style scoped>
  .dropdown-menu {
    min-width: 100%;
  }
  .dropdown-content {
    overflow: auto;
    max-height: 30vh;
  }
</style>

