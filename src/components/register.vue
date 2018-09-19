<template>
  <div id="section-login" class="content-login">
    <div class="form-login">
      <div>
        <router-link to="/"><i class="material-icons prefix">chevron_left</i></router-link>
        <h3>CREAR CUENTA</h3>
      </div>
      <div class="section-Text">
        <div class="input-field">
          <i class="material-icons user prefix">person</i>
          <input type="text" placeholder="Nombre" v-model="txtname" required>
        </div>
        <div class="input-field">
          <i class="material-icons user prefix">library_add</i>
          <input type="text" placeholder="Apellidos" v-model="txtlastname" required>
        </div>
        <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" placeholder="Email" v-model="txtemail"  required>
          </div>
          <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" placeholder="password" v-model="txtpassword"  required>
          </div>
      </div>
      <div class="section-Button">
          <button v-on:click="register" id="button" class="btn btn-large btn-extended grey lighten-4 purple-text">REGISTRARME</button>
          <span class="message" >{{messages}}</span>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from 'firebase';
import confgFirebase from '../js/confgFirebase'
export default {
  name: 'login',
  data: () => {
    return {
      txtname: '',
      txtlastname:'',
      txtemail: '',
      txtpassword: '',
      messages:''
    };
  },
  methods: {
    register: function(e) {
      let elem = this
      if (txtemail.value != '' && txtpassword.value != '' && txtname != '' && txtlastname != '') {
        if (confgFirebase.validateFormateEmail(txtemail.value) === true) {
              firebase.auth().createUserWithEmailAndPassword(txtemail.value, txtpassword.value)
                .then((user) => {
                  const nameUsers = txtname.value + ' ' + txtlastname.value;
                  confgFirebase.saveDataEmail(user, nameUsers, txtpassword.value, 'http://svgur.com/i/65U.svg');
                  return user.user.updateProfile({ 'displayName': nameUsers, 'photoURL': 'http://svgur.com/i/65U.svg' });
                  this.$router.push('home');
                })
                .catch(function (error) {
                  elem.messages = confgFirebase.mesaggeFirebase(error.message)
                });
            }else {
              elem.messages = confgFirebase.mesaggeFirebase(error.message)
              }
          }else {
            elem.messages = 'Llenar todos los campos';
        }      
        e.preventDefault();
    }
  }
};
</script>
<style>
  .message{
    color: red;
    margin: 5px 0px 0px;
    display: block;
    width: 100%;
  }
  #button{
    margin-left: 25%
  }
  .input-field .prefix{
    color: #004e66;
  }
  .content-login {
    width: 30%;
    height: 100%;
    margin: 0% 5% 0% 65%;
    -ms-flex-line-pack: center;
    align-content: center;
    background: #fff;
    padding: 4em 0em;
    box-shadow: -1px -1px 20px 0px #8fb8d3;
  }
  .content-login form {
    text-align: center;
    height: 100%;
  }
  .form-login {
    padding: 1em 1em;
    margin: 0px 0px 20px 0px;
  }
  .form-login h3 {
    color: #004e66;
    font-size: 1.5em;
    padding-top: 1em;
  }
  .section-text {
    margin: 20px 0px;
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
