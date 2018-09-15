<template>
  <div class='form_delete_post'>
    <textarea type='textare' id='input-post' class='input-post' placeholder='¿Tienes algo que contar?' v-model="txtPost"></textarea>
    <div id='file-preview-zone'></div>
    <div class='accion-public'>
     <div id='button-post' >
        <select v-model="privacy" value="Selecciona">
          <option>Público</option>
          <option>Solo yo</option>
        </select>
        <input id="button-Publicar" type='button' value='Publicar' v-on:click="insertPost">
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
    }
  },
  methods:{
    insertPost: function () {
      console.log(this)
      console.log(this.txtPost)
      processing_data.insertNewPost(this.txtPost, this.privacy);
      
    }
  }
}
</script>
<style>
#button-Publicar{
  padding: 1em;
  margin: .5em;
  border: none;
  background: #99cc00;
  color: #fff;
}
select{
  display: block !important;
}
</style>


