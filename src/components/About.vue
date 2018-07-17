<template>
  <div class="about">
    <div class="institution-wrapper">
      <a class="img" href="https://www.ortolang.fr/market/lexicons/demonette">
        <img class="img-d" src="../assets/demonette.svg"/>
      </a>
      <institution name="Démonette"
                   :content="demonette"/>
    </div>
    <div class="institution-wrapper">
      <a class="img" href="http://www.atilf.fr/"><img src="../assets/atilf.gif"/></a>
      <institution class="institution" name="ATILF" :content="atilf"/>
    </div>
    <div class="institution-wrapper">
      <a class="img" href="http://www.cnrs.fr/"><img src="../assets/cnrs.png"/></a>
    <institution class="institution" name="CNRS" :content="cnrs"/>
    </div>
    <div class="institution-wrapper">
      <a class="img" href="http://www.univ-lorraine.fr/"><img src="../assets/ul.jpg"/></a>
    <institution name="Université de Lorraine"
                :content="udl"/>
    </div>
    <div class="has-text-centered">
    <hr/>
    <br/>
    <p class="title is-4">
    Crédits :
    </p>
      <ul>
        <li>Fiametta Namer - Responsable Scientifique</li>
        <li>Simon Meoni - Conception et Réalisation</li>
        <li>Cyril Pestel - Conception et Réalisation</li>
      </ul>
  </div>
  </div>
</template>

<script>
import { version } from '../../config/version-config';
import Institution from './Institution';

export default {
  components: { Institution },
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
    };
  },
};
</script>
<style scoped>
  hr {
    width: 25%;
    margin: auto;
  }
  .about {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
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
</style>
