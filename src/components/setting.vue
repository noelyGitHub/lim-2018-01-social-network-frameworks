<template>
  <div id='hint_menu_account' class='hint-menu-account'>
    <div class='name-hint-account'>
      <h4>{{userLogin}}</h4>
      <p>{{email}}</p>
    </div>
    <div class='wrap-hint-menu-account'>
      <div class='photo-box'>
        <div class='contain-photo'>
          <label for=''>Change</label>
          </div>
      </div>
    </div>
    <div class='item-hint'>
      <ul>
        <li id='header_my_account' ><a href='#'><span class='icon-user'></span>Mi perfil</a></li>
        <li><a href='#'><span class='icon-lock'></span>Cambiar contraseña</a></li>
        <li><a href='#'><span class='icon-cog'></span>Configuración</a></li>
        <li><a href='#'><span class='icon-question'></span>Ayuda</a></li>
        <li id='li_logout'><a href='#'><span class='icon-switch' ></span>Cerrar Sesión</a></li>
      </ul>
    </div>
</div>
</template>
<script>
/* eslint-disable */
import firebase from 'firebase';

export default {
  name: 'setting',
   data () {
    return {
      userLogin: 'Noely',
      email:'hola@mail.com',
    }
  }, 
  methods: {
    logOut: (e) => {
      firebase.auth().signOut()
      .then(() => {
        this.$router.go({ path: this.$router.path });
      });
    }
  }
}
</script>
<style>/* 
  .hint-menu-account{
    display: none;
    position: absolute;
    background: #fff;
    overflow: hidden;
    width: 18em;
    top: 3.5em;
    right: 5em;
    -webkit-box-shadow: 0px 10px 28px 0px #a0a0a0;
    box-shadow: 0px 10px 28px 0px #a0a0a0;
  }
    .hint-menu-account .photo-box{
    height: 8em;
    float: left;
    width: 8em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo-box .contain-photo{
    height:5.5em;
    width: 5.5em;
    cursor: pointer;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background: #673AB7;
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
    padding: .9em;
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
  .photo-box .contain-photo img{
    height: 6em;
    display: inline-block;
  }
  .photo-box .contain-photo label{
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    color: #fff;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    padding: .8em .8em .8em  0em;
  }
  .name-hint-account{
    padding: .8em;
    overflow: hidden;
    display: block;
    border-bottom: solid 1px #f1f1f1;
  }
  .name-hint-account h4{
    font-size: 14px;
    color: #444;
    font-weight: normal;
    padding: .2em;
    /*background: #Ead;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .name-hint-account p{
    font-size: 12px;
    color: #777;
    padding: 0 0 .2em .25em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  } */
</style>