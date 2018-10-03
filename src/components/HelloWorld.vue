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
        <img :src="hero.images">
        <h1>{{ hero.name }}</h1>
        <h1>{{ hero.value }}</h1>
      </article>
    </div>

    <form @submit="randomHero()">
        <button type="submit">Select Hero</button>
    </form>
    
    <div>
      Selected Hero: {{selectedHero}}
    </div>

  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'HelloWorld',
  data () {
    return {
      dotaheroes: [],
      name: '',
      images: '',
      value: '',
      selectedHero: ''
    }
  },
  firestore () {
    return {
      dotaheroes: db.collection('dotaheroes').orderBy('value')
    }
  },
  methods: {
    addHero (name, images, value) {
      db.collection('dotaheroes').add({name, images, value})
    },
    randomHero () {
      this.selectedHero = 'Axe'
    }
  }
}
</script>

<style>
</style>
