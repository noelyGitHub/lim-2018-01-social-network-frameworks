<template>
<div>
    <menu-nav></menu-nav>
    <div id='post-main'>
        <div class='devsite-banner-content'>
          <div class='devsite-post'>
            <div class='newPost' id="newPost">
             <insertPost/>
                <div id='div_new_post' v-if="Object.keys(updatePost).length !== 0">
                <div class='form_delete_post'>
                    <div class='headerPopup'>
                       <i v-on:click='updatePost={}' id='publicar-cancelar' class="material-icons prefix">clear</i>
                      <h4 id='titlePopup'>Editar post</h4>
                    </div>
                    <textarea type='textarea' id='input-post' v-model="updatePost.post"></textarea>
                    <p>{{message}}</p>
                    <div class='accion-public'>
                     <div id='button-post' >
                        <select v-model="privacy" id='typePost'>
                          <option>Público</option>
                          <option>Solo yo</option>
                        </select>
                        <input v-on:click='postUpdate(updatePost.uid)' type='button' value='Modificar' id='edit-post' class='publicar-cancelar'>
                        <!--<input type='button' value='Publicar' id='send-post' class='publicar-cancelar'>-->
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class='content-post'>
            <list-post  :privacy='status' v-on:update-post='updatePost=$event'></list-post>
            </div>
        </div>
        <div class='devsite-page-nav'>
           <list-user></list-user>
        </div>
      </div>
    <div class="new_posts" id="new_posts">
      <i id="icon-pencil" class="material-icons prefix">add</i>
    </div>
  </div>
</div>
</template>
<script>
/*eslint-disable  */
import posts from '@/components/section-post-user.vue'
import user from '@/components/list-user'
import insertPost from '@/components/insert-post'
import menunav from '@/components/menu'
import Vue from 'vue'
import processingPost from '../js/processing-data'
export default {
  name: 'boxPost',
  data(){
    return {
      status: false,      
      updatePost: {},
      isView: false,
      privacy: '',
      message: '',
      newPost: false
    }
  },
  created () {
    this.$root.$on('privacy-status', (val) => {
      this.status = val
    })
  },
  methods: {
    postUpdate(uid) {
      if (this.updatePost.post !== '' || this.privacy !=='') {
        processingPost.updatePost(this.updatePost.post,this.privacy, uid)
        this.updatePost = {}
      } else {
        this.message = 'Aún existen campos vacios'
      } 
    }
  },
  components: {  'menu-nav':menunav, 'list-post': posts, insertPost, 'list-user': user}
}
</script>
<style>
html{
    background: #e6ecf0;
}
.devsite-main-content{
    background: red;
}
#icon-pencil{
    color: #fff !important;
}
#post-main {
    width: 100%;
    height: auto;
    background: #e6ecf0;
    padding-top: 3.5em;
    min-height: 0px;
    margin-bottom: -100px;
}
.devsite-post {
    width: 40%;
    margin: 0% 20% 0% 0%;
    background: #e6ecf0;
    float: right;
}
.newpost, .content-edit {
    box-shadow: 0px 0px 6px 0px #0000008a;
    padding: 0em 1em 0em 1em;
    margin: 5px;
    background: #fff;
    border-radius: .4em;
}
#div_new_post {
    float: left;
    visibility: visible;
    position: fixed;
    left: 0%;
    margin: -375px 0 0 0;
    background: #0d0d0d80;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0px 10px 28px 0px #a0a0a0;
    box-shadow: 0px 10px 28px 0px #a0a0a0;
    -webkit-transition: all .25s ease-in-out;
    -o-transition: all .25s ease-in-out;
    transition: all .25s ease-in-out;
}
.content-post {
    margin: 5px;
}
.devsite-page-nav {
    width: 300px;
    height: auto;
    position: fixed;
    margin: 8px 0%;
    background: #fff;
    float: right;
    box-shadow: 3px 1px 7px 0px #004e6630
}
.devsite-page-nav ul {
    margin: 0px 0px 0px 10px;
}
#anuncio-user{
    text-align: center;
    margin: 1em 0px 1em -10px;
}
#new_posts {
    position: fixed;
    height: 3.6em;
    width: 3.6em;
    border-radius: 100%;
    background: #004e66;
    overflow: hidden;
    cursor: pointer;
    bottom: 1em;
    z-index: 400;
    right: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0 4px 10px 0px #404040;
    box-shadow: 0 4px 10px 0px #404040;
}
#new_posts span {
    font-size: 1.5em;
    color: #fff;
}
  .form_delete_post{
    margin: 100px 30%;
    border-radius: .4em;
    background: #fff;
  }
.form_delete_post h4{
    font-size: 16px;
    color: #004e66;
    margin: .4em 0 .4em 0;
    padding: 1em;
    text-align: center;
    text-transform: uppercase;
}
.form_delete_post .box-input{
    margin: 0 20px;
    display: block;
    padding: 1em 0em;
}
.form_delete_post p {
    width: 100%;
    color: #777;
    font-size: 16px;
    margin: 5px;
    float: right;
    padding: 1em 0em;
}
.headerPopup {
    width: 100%;
    background: #fff;
    box-shadow: 0px 3px 10px 0px #9E9E9E;
}
#input-post {
    border: none;
    width: 100%;
    padding: .5em 2em;
    margin: 10px 0px;
    height: auto;
    text-align: center;
    outline: none;
    font-size: 16px;
    min-height: 120px;
}
.accion-public {
    margin: 10px 0px;
    padding: .4em 0em;
    width: 100%;
    height: 100px;
    font-family: "freight-sans-pro", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif !important;
}
.publicar-cancelar, .delete-post {
    border: none;
    background: #004e66;
    color: #fff;
    padding: .85em 3em;
    margin-right: 5px;
    margin-top: 0px;
    outline: none;
    text-transform: uppercase;
}
#publicar-cancelar{
    float: right;
    cursor: pointer;
    padding: .2em;
}
#typePost{
  width: 40% !important;
  margin-right: 10%;
  margin-left: 5%;
  float: left;
  display:block
}
@media (max-width:1200px){
    .form_delete_post{
        margin: 20% 10% 0 40%
    }
    .devsite-post {
      margin: 0% 15% 0% 0%;
    }
}
@media (max-width: 800px){
  .devsite-post {
      width: 70%;
  }
  .form_delete_post{
        margin: 100px 10%;
    }
  .devsite-page-nav { 
      display: none;
      }
}
@media (max-width: 490px){
  .devsite-post {
      width: 100%;
      margin: 0% 0%;
  }
  .form_delete_post{
        margin: 50% 1%;
    }
}
</style>
