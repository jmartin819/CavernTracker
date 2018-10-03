<template>
  <div>
    <form @submit="addHero(name, images, value)">
        <input v-model="name" placeholder="Hero Name">
        <input v-model="images" placeholder="Hero Image URL">
        <input v-model="value" placeholder="Hero Value">
        <button type="submit">Add New Hero</button>
    </form>

    <div>
      <article v-for="(hero, idx) in dotaheroes" :key="idx">
<!--        <img :src="hero.images">-->
        <h1>{{ hero.name }}</h1>
<!--        <h1>{{ hero.value }}</h1>-->
      </article>
    </div>

    <form @submit="randomHero()">
        <button type="submit">Select Hero</button>
    </form>

    <div>
      Selected Hero: {{selectedHero}}
    </div>

    <form @submit="getHeroData()">
        <button type="submit">Get Hero Data</button>
    </form>

    <div>
      Info: {{info}}
    </div>
<!--
    <form @submit="storeHeroData()">
        <button type="submit">Store Hero Data</button>
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
