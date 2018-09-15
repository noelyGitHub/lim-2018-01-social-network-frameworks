<template>
  <nav>
      <div class="nav-wrapper purple">
        <div class="container">
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <div class='header-section'>
          <div class=search>
            <input type='text' class='search-input' placeholder='Buscar'>
          </div>
        </div>
        <ul class="right hide-on-med-and-down">
          <li v-on:click="postPublic">Inicio </li>
          <li  v-on:click="postPrivacy" class='content-photo-view-profile' ><img :src='photoUser' alt='photo-profile' id="btnLogOut"></li>
          <li class='name-view-data'><p>{{userLogin}}</p></li>
          <li><button v-on:click="logout" class="btn #cc9900">Logout</button></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><button v-on:click= "logout" class="btn">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from 'firebase'
import processingPost from '../js/processing-data'

export default {
  name: 'menu',
  // eslint-disable-next-line
  data() {
    let userId = firebase.auth().currentUser
    return {
      userLogin: userId.displayName,
      photoUser: userId.photoURL,
      email: userId.email
    }
  },
  methods: {
    logout: (e) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('exito!')
        })
      e.preventDefault()
    },
    search: () => {
      processingPost.searchUsers()
    },
    postPublic: () => {
      alert('public')
      return false
    },
    postPrivacy: () => {
      alert('privacy')
      return true
    }
  }
}
</script>
<style>
.icon-home2 {
  font-size: 1.35em;
  padding: 0.48em 1em 0.48em 0.48em;
  color: #7e8384;
  border-radius: 100%;
  cursor: pointer;
  float: right;
}
.icon-home2 label {
  font-size: 14px;
}
.header-main {
  box-shadow: 0px 2px 10px 0px #c5c5c5;
}
.header-view-logo {
  float: left;
}
.header-view-logo img {
  width: 50px;
  height: 40px;
  padding: 3px 5px;
}
.content-photo-view-profile {
  float: left;
  margin-top: .6em;
  cursor: pointer;
  height: 3.2em;
  border: solid 2px #e0e0e0;
  width: 3.2em;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-photo-view-profile img {
  height: 3.2em;
  display: inline-block;
}
.name-view-data {
  float: left;
  width: 5em;
  height: 4.5em;
  margin-right: 1em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.name-view-data p {
  width: 100%;
  color: #777;
  padding: 0 0 0 0.4em;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.header-view-logo {
  float: left;
}
.header-view-logo img {
  width: 50px;
  height: 40px;
  padding: 3px 5px;
}
.header-section {
  float: left;
  padding: 0.35em 0.2em;
  width: 25%;
  margin: 0 0 0 0%;
}
.header-section-user {
  float: left;
  overflow: hidden;
  padding: 0em 8em 0em 0.3em;
  align-content: flex-start;
}
.search {
  width: 100%;
  padding: 0.4em 0em;
  border: 1px solid #ccc;
  border-radius: 0.8em;
  float: left;
  line-height: 30px;
  background-color: #fff !important;
}
.search input {
  width: 90% !important;
  padding: 0em 0.7em !important;
  border: none !important;
  outline: none !important;
  margin: 0 0 0 0 !important;
}
.icon-search {
  color: #ccc;
  padding: 0.3em 0em;
  cursor: pointer;
}
@media (max-width: 950px) {
  .header-section-user {
    padding: 0em 1em;
  }
}
</style>
