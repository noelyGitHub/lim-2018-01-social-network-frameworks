/* eslint-disable */
<template>
<div id="section-login" class="content-login">
  <form>
      <div class="logo">
        <img src="https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/42170171_1045279938979326_7820292361115664384_n.png?_nc_cat=0&_nc_eui2=AeE5jCA4cZ1NilCA4ehUEyVSvA5Hu1kD4T5NzjkPBfZb9imld52U6iGiDCvvWIvS5TLuAOt9TmYWGJrABIfunldAoU87G9uHhimY_Xbh3las6g&oh=fbad08d3b69dd957753b2d39f16eb4e0&oe=5C22CFCE" alt="logo">
      </div>
      <div class="form-login">
        <div class="section-Text">
          <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email" required>
          </div>
          <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password" required>
          </div>
        </div>
      </div>
      <div class="section-Button">
        <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 purple-text">INICIAR SESION</button>
        <span class="message" >{{messages}}</span>
        <span class="or"> ó con</span>
      </div>
      <div class="loginAditional">
        <span><a v-on:click="singInFacebok"  id="btnLoginFacebook" class="icon-facebook">F</a></span>
        <span><a v-on:click="singInGoogle" id="btnLoginGoogle" class="icon-google">G</a></span>
      </div>
      <div class='section-register'>
        <span>¿Aún no tienes cuenta?</span><router-link to="/register">Registrate</router-link>
      </div>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from 'firebase';
import confgFirebase from '../js/confgFirebase'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      messages: ''
    };
  },
  methods: {
    login: function (e) {
      let elem = this
      const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        this.$router.push('home');
      });
      promise.catch(function(error) {
        elem.messages = confgFirebase.mesaggeFirebase(error.message)
      });
      e.preventDefault();
    },
    singInGoogle: function (e){
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          confgFirebase.saveDataRedirec(result.user);
          this.$router.push('home');
        })
        .catch(error => {
          alert(error.message);
          });
      e.preventDefault();
    },
    singInFacebok: function (e){
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('public_profile');
      firebase.auth().signInWithPopup(provider)
        .then( (result)=> {
          confgFirebase.saveDataRedirec(result.user);
          this.$router.push('home');
        })
        .catch(error => {
          alert(error.message);
        })
      e.preventDefault();
    },
    registerAnonymus: (e) => {
      firebase.auth().signInAnonymously();
      e.preventDefault();
    },
  }
}
</script>
<style>
  html{
    background: url(https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/42195871_479964062509222_3485856196861100032_n.jpg?_nc_cat=0&_nc_eui2=AeGg6ej5GrHserr9oeH5UAgI1n7D9dTw3ks2v7rU3R13UKpMCyUZ77JlKPFk4ftTannbw4oBh_RVlYIpF7PNLZU497E_xjwkC4ZA3RDSPq4E5A&oh=dd4ae9cad49947d38f85aeb6bc6a61de&oe=5C16477C) no-repeat;
    background-size: cover;
  }
  body{
      width: 100%;
      height: 100%;
      background: rgba(57, 49, 49, 0.64);
  }
  .or, .message {
    margin: 5px 0px;
    display: block;
    width: 100%;
    margin-bottom: 30px;
  }
  .message{
    color: red;
    margin: 5px 0px 0px;
  }

  .icon-facebook,
  .icon-google,
  .icon-mail2 {
    color: #fff;
    font-size: 1.2em;
    border-radius: 100%;
    padding: 0.8em 1.2em;
    margin: 0% 1%;
    background: rgba(178, 178, 178, 0.4);
    box-shadow: 0px 0px 4px 1px #ccc;
    cursor: pointer;
    font-weight: 900;
  }
  .icon-facebook:hover {
    background: #354277;
    box-shadow: 0px 0px 4px 1px rgba(204, 204, 204, 0.486);
  }
  .icon-google:hover {
    background: #db4437;
    box-shadow: 0px 0px 4px 1px rgba(204, 204, 204, 0.486);
  }
  .grey.lighten-4 {
      background: #004e66 !important;
      color: #fff !important;
  }
  .content-login {
    width: 30%;
    height: 100%;
    margin: 0% 5% 0% 65%;
    -ms-flex-line-pack: center;
    align-content: center;
    background: #fff;
    padding: 2em 0em;
    box-shadow: -1px -1px 20px 0px #8fb8d3;
  }
  .content-login form {
    text-align: center;
    height: 100%;
  }
  .logo {
    padding: 40px 0px 0px 0px;
  }
  .logo img {
    width: 150px;
    background: #fff;
    border-radius: 100%;
  }
  .form-login {
    padding: 1em 1em;
    margin: 0px 0px 20px 0px;
  }
  .form-login h3 {
    color: #004e66;
    font-size: 1.5em;
    padding-top: 1em;
    text-align: center;
  }
  .section-text {
    margin: 20px 0px;
  }
  .section-value {
    width: 100%;
    border: none;
    border-bottom: 0.5px solid #77777761;
    margin: 20px 0px;
    padding: 0.3em 0px;
  }
  .section-value:hover {
    border-bottom: 1px solid #33b8bf;
  }
  .section-value input {
    width: 90%;
    border: none;
    color: #313434;
    font-size: 16px;
    outline: none;
    padding: 0.5em 0em 0em 0em;
  }
  #btnLogin {
    width: 80%;
    border: none;
    outline: none;
    padding: 1em 0em;
    margin: 20px 0px;
    margin-bottom: 25px;
    color: #fff;
    text-transform: uppercase;
    background: #33b8bf;
    cursor: pointer;
  }
  #messageValide,
  #mensaggeRegisterValide {
    color: #ff4081;
    font-size: 0.8em;
    padding: 1em 0em 2em 0em;
  }
  .loginAditional {
    align-content: center;
  }

  .section-register {
    padding: 3em 0.5em 0.5em 0.5em;
  }
  .section-register span {
    color: #77777761;
  }
  .section-register a {
    color: #33b8bf;
    cursor: pointer;
  }
  @media (max-width: 950px) {
    .content-login {
      width: 50%;
      margin: 0% 0% 0% 50%;
    }
  }
  @media (max-width: 750px) {
    .content-login {
      width: 80%;
      margin: 0% 10%;
    }
  }
  @media (max-width: 490px) {
    .content-login {
      width: 100%;
      margin: 2% 3%;
      margin: 0%;
      box-shadow: inset 0px 0px 0px 0px #fff;
    }
  }
</style>