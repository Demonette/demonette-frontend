<template>
  <div class="hero-body">
    <div class="about columns is-fluid is-multiline">
      <div class="columns">
      <a class="is-1 column" href="https://www.ortolang.fr/market/lexicons/demonette">
        <figure class="image"><img src="../assets/demonette.jpg"/></figure>
      </a>
      <institution class="is-5 column" name="Démonette" :content="demonette"/>
      </div>
    <div class="columns ">
      <a class="is-1 column" href="http://www.atilf.fr/"><figure class="image"><img src="../assets/atilf.jpg"/></figure></a>
      <institution class="is-6 column" name="ATILF" :content="atilf"/>
    </div>
    <div class="columns">
      <a class="is-1 column" href="http://www.cnrs.fr/"><figure class="image"><img src="../assets/cnrs.png"/></figure></a>
    <institution class="is-6 column" name="CNRS" :content="cnrs"/>
    </div>
    <div class="columns">
      <a class="is-1 column" href="http://www.univ-lorraine.fr/"><figure class="image"><img src="../assets/ul.jpg"/></figure></a>
      <institution class="is-6 column" name="Université de Lorraine" :content="udl"/>
    </div>
    <div class="has-text-centered container">
    <p class="title is-5">
    Crédits :
    </p>
    <p>Fiammetta Namer - Responsable Scientifique</p>
    <p>Simon Meoni - Conception et Réalisation</p>
    <p>Cyril Pestel - Conception et Réalisation</p>
  </div>
  </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

import { version } from '../../config/version-config';
import Institution from './Institution';

export default {
  components: {
    Institution,
    VuePerfectScrollbar,
  },
  name: 'About',
  data() {
    return {
      appVersion: version[process.env.NODE_ENV],
      cnrs: `Le Centre national de la recherche scientifique, plus connu sous le sigle CNRS,
      est le plus grand organisme public français de recherche scientifique.
      Juridiquement, c'est un établissement public à caractère scientifique et technologique (EPST) placé
      sous la tutelle administrative du ministère de l'Éducation nationale, de l'Enseignement supérieur et de la Recherche.`,
      atilf: ` L'UMR 7118 ATILF (CNRS/Université de Lorraine) voit son excellence reconnue tant au plan national qu’international.
      Rattachée à l’Institut des sciences humaines et sociales du CNRS,
      elle est aussi laboratoire d’interface avec le Département des sciences et technologie de l’information et de l’ingénierie.
      Elle est membre de la fédération CNRS - Institut de Linguistique Française
      et du consortium international TEI (Text Encoding Initiative).`,
      udl: `Université de tous les savoirs, l’Université de Lorraine promeut la mutualisation des savoirs.
      Des sciences fondamentales aux sciences humaines, elle crée des éco-systèmes trans-disciplinaires au service de l’innovation,
      qui accélèrent le passage de la connaissance aux applications.`,
      demonette: ` Démonette est une base lexicale morphologique du français organisée en réseau dérivationnel,
      dont chaque entrée est un couple (Mot1, Mot2) appartenant à la même famille morphologique.
      Chaque entrée est décrite par 31 champs (dont la catégorie morphosyntaxique et le type sémantique de chaque mot,
      ainsi que la définition de Mot1 par rapport à Mot2).
      La version distribuée Démonette-1.2 comporte 96027 entrées, dont les données initiales ont pour origine le TLFnome et Verbaction.`,
      settings: {
        maxScrollbarLength: 60,
      },
    };
  },
};
</script>

<style scoped>
  .institution-wrapper {
    display: flex;
    flex-direction: row;
    margin-left: 10%;
  }
  .institution {
    flex-basis: 80%;
  }
  .img {
    flex-basis: 7%;
    margin-right: 2%;
    align-self: center;
  }
  .img-d {
    width: 100%;
    height: 100%;
    margin-top: 5%;
  }
  .is-vertical-center {
    display: flex;
    align-items: center;
  }
  .hero-body {
    max-height:90vh;
    overflow-y: auto;
  }
</style>
