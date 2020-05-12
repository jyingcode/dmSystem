<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
    <div class="loading" v-if="apiLoad">
      <vue-loading class="load" v-if="apiLoad" type="spiningDubbles" color="#01acc6" :size="{ width: '50px', height: '50px' }"></vue-loading>  
    </div>
  </div>
  
</template>

<script>
/*
 * Root component
 */
import vueLoading from 'vue-loading-template'
import {mapGetters} from 'vuex';
export default {
	name: 'app',
    components: {
      vueLoading
    },
     computed: {
      ...mapGetters(['apiLoad'])
    },
}
</script>

<style>
	.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(255, 255, 255, 0.69);;
  z-index:100000001;
  height: 100%;
  padding-top: 60%
}
</style>
