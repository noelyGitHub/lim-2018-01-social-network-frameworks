import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueFire)

const firebaseConfig = {
  apiKey: 'AIzaSyBBnVy160f4mQZMlgAFz7pGGIPf-NJnipI',
  authDomain: 'redsocial-90c70.firebaseapp.com',
  databaseURL: 'https://redsocial-90c70.firebaseio.com',
  projectId: 'redsocial-90c70',
  storageBucket: 'redsocial-90c70.appspot.com',
  messagingSenderId: '878843169522'
}
firebase.initializeApp(firebaseConfig)
/* eslint-disable */
let app;
firebase.auth().onAuthStateChanged((error) => {
  if (!app) {
    app = new Vue({
      el: '#body',
      router,
      template: '<App/>',
      components: { App }
    })
  }
})





