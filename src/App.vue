<template>
  <div id="app">
        <header class="navbar is-primary">
          <div class="navbar-brand">
            <a class="navbar-item" href="http://redac.univ-tlse2.fr/lexiques/demonette.html">
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
        </header>
    <br/>
    <router-view clas="section"/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
