<template>
  <div id="section-login" class="content-login">
    <div class="form-login">
      <div>
        <span class="icon-circle-left" id="back-login"></span><router-link to="/">back</router-link>
        <h3>CREAR CUENTA</h3>
      </div>
      <div class="section-Text">
        <div class="input-field">
          <i class="material-icons user">user</i>
          <input type="text" id="txtname" v-model="txtname" required>
          <label>Name</label>
        </div>
        <div class="input-field">
          <i class="material-icons user">txtlastname</i>
          <input type="text" id="txtlastname" v-model="txtlastname" required>
          <label>Last Name</label>
        </div>
        <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="txtemail" v-model="txtemail"  required>
          </div>
          <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="txtpassword" v-model="txtpassword"  required>
          </div>
      </div>
      <div class="section-Button">
          <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 purple-text">REGISTRARME</button>
          <p id="mensaggeRegisterValide"></p>
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
      txtmessage:''
    };
  },
  methods: {
    register: (e) => {
      if (txtemail.value != '' && txtpassword.value != '' && txtname != '' && txtlastname != '') {
        if (confgFirebase.validateFormateEmail(txtemail.value) === true) {
              firebase.auth().createUserWithEmailAndPassword(txtemail.value, txtpassword.value)
                .then((user) => {
                  alert("exito!");
                  const nameUsers = txtname.value + ' ' + txtlastname.value;
                  confgFirebase.saveDataEmail(user, nameUsers, txtpassword.value, 'http://svgur.com/i/65U.svg');
                  return user.user.updateProfile({ 'displayName': nameUsers, 'photoURL': 'http://svgur.com/i/65U.svg' });
                })
                .catch(function (error) {
                  alert(confgFirebase.mesaggeFirebase(error.message))
                });
            }else {
              alert(confgFirebase.validateFormateEmail(txtemail.value))
              }
          }else {
            alert('Llenar todos los campos');
        }      
        e.preventDefault();
    }
  }
};
</script>
<style>
.content-login {
  width: 30%;
  height: 100%;
  margin: 0% 0% 0% 60%;
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
.form-login {
  padding: 1em 1em;
  margin: 0px 0px 20px 0px;
}
.form-login h3 {
  color: #475586;
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
