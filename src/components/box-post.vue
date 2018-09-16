<template>
<div>
    <menu-nav  v-on:privacy-status='status=$event'></menu-nav>
    <div id='post-main'>
        <div class='devsite-main-content' id='devsite-main-content'>
            <div class='devsite-banner-content'>
                <div class='devsite-post'>
                    <div class='newPost' id="newPost">
                    <div>
                      <insertPost/>
                      <div id='div_new_post'>
                      </div>
                    </div>
                    </div>
                    <div class='content-post'>
                    <list-post v-bind:privacy='status'></list-post>
                    </div>
                </div>
                <div class='devsite-page-nav'></div>
            </div>
        </div>
        <div class="new_posts" id="new_posts">
            <i @click="like(item.uid)" id="icon-pencil" class="material-icons prefix">add</i>
        </div>
    </div>
</div>
</template>
<script>
/*eslint-disable  */
import posts from '@/components/section-post-user.vue'
import insertPost from '@/components/insert-post'
import menunav from '@/components/menu'
import Vue from 'vue'
export default {
  name: 'boxPost',
  data(){
    return {
      status: false
    }
  },
   created() {
     console.log(this.status)
   },
  components: {  'menu-nav':menunav, 'list-post': posts, insertPost }
}
</script>
<style>
#icon-pencil{
    color: #fff !important;
}
#post-main {
    width: 100%;
    height: auto;
    background: #e6ecf0;
    padding-top: 3.5em;
    min-height: 650px;
}
.devsite-post {
    width: 40%;
    margin: 0% 30%;
    background: #e6ecf0;
}
.newpost, .content-edit {
    box-shadow: 0px 0px 6px 0px #0000008a;
    padding: 0em 1em 0em 1em;
    margin: 5px;
    background: #fff;
    border-radius: .4em;
}
.input-post {
    border: none;
    width: 100%;
    padding: .5em 2em;
    margin: 10px 0px;
    height: auto;
    text-align: center;
    outline: none;
    font-size: 16px;
    background: #fff;
}
#div_new_post {
    display: none;
    float: left;
    visibility: visible;
    position: fixed;
    left: 0%;
    margin: -115px 0 0 0;
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
@media (max-width: 750px){
  .devsite-post {
      width: 70%;
      margin: 0% 15%;
  }
}
@media (max-width: 490px){
  .devsite-post {
      width: 100%;
      margin: 0% 0%;
  }
}
</style>
