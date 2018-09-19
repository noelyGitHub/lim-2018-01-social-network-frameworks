<template>
  <ul>
    <p id="anuncio-user">¿A quien preguntar?</p>
    <li v-for="item in items" :key='item.uid'>
      <div>
        <div class='content-img'>
          <img class='photo-profile-user-post' id="photo-profile" :src='item.photoURL' alt='photo'>
        </div>
        <div class="name-hint-account">
          <h4>{{item.name}}</h4>
          <p>{{item.email}}</p>
        </div>
      </div>
    </li>
    <div class="info-dev">
      ©2018 Noely Flores •
      <span>Bootcamp - Laboratoria</span>
    </div>
  </ul>
</template>
<script>
/* eslint-disable */ 
import firebase from 'firebase'
export default {
  name: 'list-user',
  data() {
    return {
      items: []
    }
  },
  created() {
    const users = firebase.database().ref().child('Usuarios').limitToFirst(9)
    users.on('value', user => {
      this.items = user.val()
    })
  }
}
</script>
<style>
#photo-profile{
    width: 38px;
    height: 38px;
}
.info-dev{
    padding: 1em 1em;
    border-top: 1px solid #ccc;
    margin-top: 40px;
    color: #ccc;
    font-size: 12px;
}
</style>
