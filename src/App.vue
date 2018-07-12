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
        </div>
      </div>
    </nav>
      <transition name="fade" mode="out-in">
        <router-view class="main"/>
      </transition>
    <demonette-footer/>
    </div>
</template>

<script>
import DemonetteFooter from './components/DemonetteFooter';

export default {
  components: { DemonetteFooter },
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
  .main {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  #app {
    min-height:100vh; /* 1 */
    display:flex; /* 2 */
    flex-direction:column; /* 3 */
  }
</style>
