<template>
  <div class='form_delete_posts'>
    <textarea id='input-post-insert' placeholder='¿Tienes algo que contar?' v-model="txtPost"></textarea>
    <div class='accion-public'>
     <div id='button-post' >
        <select v-model="privacy" id='select-privacy'>
          <option>Público</option>
          <option>Solo yo</option>
        </select>        
        <input id="button-Publicar" type='button' value='Publicar' v-on:click="insertPost">
        <p>{{message}}</p>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import processing_data from '../js/processing-data'
export default {
  name: 'insertPost',
  data(){
    return {
      txtPost: '',
      privacy: '',
      message:''
    }
  },
  methods:{
    insertPost: function () {
      if (this.txtPost !== '' || this.privacy !=='') {
        processing_data.insertNewPost(this.txtPost, this.privacy);
        this.txtPost = ''
        this.privacy = ''
        this.message = ''
      } else {
        this.message = 'Aún existen campos vacios'
      }   
      
    }
  }
}
</script>
<style>
  #button-Publicar{
    padding: 1em;
    width: 45%;
    margin: 0% 2%;
    border: none;
    background: #99cc00;
    color: #fff;
    outline: none;
    text-transform: uppercase;
  }
  .form_delete_posts{
      margin: 55px 0%;
      border-radius: .4em;
      background: #004e66;
    }
  #input-post-insert{
    width: 96%;
    margin: 2%;
    resize: none;
    height: 5em;
    border: none;
    text-align: center;
    background: #fff;
  }
  select{
    display: block !important;
  }
  #select-privacy {
    width: 45%;
    float: left;
    padding: 6px;
    margin: 0% 2% 0% 3%;
    height: 3.2rem;
  }
  #button-post p{
    margin: 10px;
    color: red;
  }
</style>


