<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-head">
        <header class="navbar">
          <div class="navbar-brand">
            <a class="navbar-item" href="http://redac.univ-tlse2.fr/lexiques/demonette.html">
              Démonette
            </a>
          </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item" href="https://bulma.io/">
                  Rechercher
                </a>
                <a class="navbar-item">
                  À propos
                </a>
                <a class="navbar-item">
                  Contact
                </a>
              </div>
            </div>
        </header>
      </div>
    </section>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
