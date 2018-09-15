// Initialize Firebase
import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import firebaseConfig from './firebaseConexion'
Vue.use(VueFire)
firebase.initializeApp(firebaseConfig)
