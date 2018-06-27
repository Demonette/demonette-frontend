<template>
  <div id="app">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.ortolang.fr/market/lexicons/demonette" target="_blank">
          Démonette
        </a>
        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link :to="{ name: 'Search'}" class="navbar-item">
            Rechercher
          </router-link>
          <router-link :to="{ name: 'About'}" class="navbar-item">
            À propos
          </router-link>
          <router-link :to="{ name: 'Contacts'}" class="navbar-item">
            Contacts
          </router-link>
        </div>
      </div>
    </nav>
    <br/>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active avant la 2.1.8 */ {
    opacity: 0;
  }
</style>
