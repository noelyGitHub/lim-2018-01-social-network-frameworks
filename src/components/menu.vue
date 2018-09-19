<template>
  <div class="header-main">
    <div class='header-main-content'>
      <div class='header-section-user' id='header-section-user'>
        <div v-on:click="showOption()" class='content-photo-view-profile' >
          <img :src='photoUser' alt='photo-profile' id="btnLogOut">
        </div>
        <div class="name-view-data">
           <p>{{userLogin}}</p>
        </div>
      </div>
    </div>
    <div>
      <span class='icon-home2'>
        <i  v-on:click="postPublic(false)" id= "icon" class="material-icons">home</i>
      </span>
    </div>
    <div class="hint-menu-account"  v-if="conf ===true">
      <div class="name-hint-account">
        <h4>{{userLogin}}</h4>
          <p>{{email}}</p>
      </div>
      <div class="wrap-hint-menu-account">
        <div class="photo-box">
          <div class="contain-photo">
            <img :src='photoUser' alt="profile">
            <label for="">Change</label>
          </div>
        </div>
        <div class="item-hint">
          <ul>
            <li id="header_my_account" v-on:click="postPrivacy(true)" ><a href="#"><span class="icon-user"></span>Mi perfil</a></li>
            <li><a href="#">Cambiar contraseña</a></li>
            <li><a href="#">Configuración</a></li>
            <li><a href="#">Ayuda</a></li>
            <li v-on:click= "logout">Cerrar Sesión</li>
          </ul>
        </div>
      </div>
    </div>
    <div class='header-section'>
      <div class=search>
        <input type='text' class='search-input' placeholder='Buscar'>
        <span class='icon-search'></span>
      </div>
    </div>
    <div class='content-search'>
        <ul class='content-search-user' id='content-search-user'></ul>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import processingPost from '../js/processing-data'
/* eslint-disable */
export default {
  name: 'menu',
  data() {
    let userId = firebase.auth().currentUser
    return {
      userLogin: userId.displayName,
      photoUser: userId.photoURL,
      email: userId.email,
      conf: false
    }
  },
  methods: {
    logout(e) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/');
        })
      e.preventDefault()
      
    },
    search: () => {
      processingPost.searchUsers()
    },
    postPrivacy(value) {
      this.$root.$emit('privacy-status', value)
      this.conf = false
    },
    postPublic(value){
      this.$root.$emit('privacy-status', value)
      this.conf = false
    },
    showOption() {
      if(this.conf === true) this.conf = false
      else this.conf = true
    },
  }
}
</script>
<style>
.header-main {
    width: 100%;
    height: 55px;
    box-shadow: 0px 2px 10px 0px #c5c5c5;
    background: #004e66;
    position: fixed;
}
nav{
      position: fixed !important;
      background: #004e66 !important;
}
#icon{
  color:#fff !important
}
.name-hint-account {
    padding: .8em;
    overflow: hidden;
    display: block;
    border-bottom: solid 1px #f1f1f1;
}
.name-hint-account h4 {
    font-size: 13px;
    color: #444;
    font-weight: normal;
    margin: 0px !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
}
.name-hint-account p {
  margin: 0px !important;
      font-size: 12px;
    color: #777;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
  /*hint menu*/
   .hint-menu-account{
    position: absolute;
    background: #fff;
    overflow: hidden;
    width: 18em;
    top: 4.1em;
    right: 1em;
    -webkit-box-shadow: 0px 10px 28px 0px #a0a0a0;
    box-shadow: 0px 10px 28px 0px #a0a0a0;
  }
  .hint-menu-account .photo-box{
    height: 8em;
    float: left;
    width: 8em;
    /*background: #add;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo-box .contain-photo {
    height: 5.5em !important;
    width: 5.5em!important;
    cursor: pointer;
    border-radius: 100%;
    overflow: hidden;
    position: relative !important;
    display: flex!important;
    align-items: center!important;
    justify-content: center!important;
}
.photo-box .contain-photo label {
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    color: #fff;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    padding: .8em .8em .8em 0em;
}
.photo-box .contain-photo img {
    height: 6em;
    display: inline-block;
}
    .hint-menu-account .item-hint ul{
    list-style-type: none;
  }
  .hint-menu-account .item-hint ul li a{
    text-decoration: none;
    color: #777;
    display: block;
  }
  .hint-menu-account .item-hint ul li:hover{
    background: #004e66;
    color: #fff;
  }
  .hint-menu-account .item-hint ul li:hover a{
    color: #fff;
  }
  .hint-menu-account .item-hint ul li span{
    float: left;
    margin: -.1em .4em 0 0 ;
    font-size: 16px;
  }
  .hint-menu-account .item-hint ul li{
    padding: .5em;
    font-size: 12px;
    cursor: pointer;
    color: #444;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .hint-menu-account .item-hint{
    float: left;
    width: 10em;
    overflow: hidden;
  }
  /**/
  .header-section-user{
    float: right;
    overflow: hidden;
    padding: .6em  8em 0em .3em;
    align-content: flex-start;
}
.content-photo-view-profile{
    float: left;
    cursor: pointer;
    height: 2.6em;
    border: solid 2px #e0e0e0;
    width: 2.6em;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.content-photo-view-profile img {
        height: 2.6em;
        display: inline-block;
   
}
.name-view-data {
    float: left;
    width: 4.4em;
    height: 2.6em;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.name-view-data p {
    width: 100%;
    color: #fff;
    padding: 0 0 0 .4em;
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
    padding: .35em .2em;
    width: 25%;
    margin: 0 0 0 1em;
}
.search {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: .8em;
    float: left;
    background: #fff;
}
.search input {
  width: 100% !important;
  padding: 1em 0em !important;
  border-radius: 2em !important;
  background: #fff !important;
  text-align: center !important;
  height: 1rem !important;
  margin: 0px !important;
  border-bottom: none !important;
}
.icon-home2 {
    font-size: 1.35em;
    padding: .78em 1em .48em .48em;
    color: #7e8384;
    border-radius: 100%;
    cursor: pointer;
    float: right;
}
.icon-home2 label {
    font-size: 14px;
}
  @media (max-width: 950px) {
    .header-section-user {
      padding: .65em 1em;
    }
    .icon-home2 {
    padding: .85em 0;
   }
  }
  @media (max-width: 450px) {
   .icon-home2 {
    padding:.85em 0;
   }
   .header-section {
    width: 55%;
  }
  .name-view-data {
    display: none !important;
  }
  }

</style>
