<template>
  <div>
    <form @submit="addHero(name, images, value)">
        <input v-model="name" placeholder="Hero Name">
        <input v-model="images" placeholder="Hero Image URL">
        <input v-model="value" placeholder="Hero Value">
        <v-btn type="submit">Add New Hero</v-btn>
    </form>

    <div>
      <article v-for="(hero, idx) in dotaheroes" :key="idx">
<!--        <img :src="hero.images">-->
        <h1>{{ hero.name }}</h1>
<!--        <h1>{{ hero.value }}</h1>-->
      </article>
    </div>

    <form @submit="randomHero()">
        <v-btn type="submit">Select Hero</v-btn>
    </form>

    <div>
      Selected Hero: {{selectedHero}}
    </div>

    <form @submit="getHeroData()">
        <v-btn type="submit">Get Hero Data</v-btn>
    </form>

    <div>
      Info: {{info}}
    </div>
<!--
    <form @submit="storeHeroData()">
        <v-btn type="submit">Store Hero Data</v-btn>
    </form>
-->
  </div>
</template>

<script>
import { db } from '../main'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      dotaheroes: [],
      name: '',
      images: '',
      value: '',
      selectedHero: '',
      info: []
    }
  },
  firestore () {
    return {
      dotaheroes: db.collection('dotaheroes')
    }
  },
  methods: {
    addHero (name, images, value) {
      db.collection('dotaheroes').add({name, images, value})
    },
    randomHero () {
      this.selectedHero = 'Axe'
    },
    getHeroData () {
      axios
      .get('https://api.opendota.com/api/heroes')
      .then(response => (this.info = response))
    },
    storeHeroData () {
      let tempheroes = this.info.data
      for (let hero in tempheroes) {
        db.collection('dotaheroes').add({
          name: tempheroes[hero].localized_name
        })
      }
    }
  }
}
</script>

<style>
</style>
