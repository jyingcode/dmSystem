<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header">
      <q-icon name="chevron_left" v-if="!hashbackBtn" @click="back()"/>
      <q-toolbar-title>
        {{headerText}}
      </q-toolbar-title>
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu"/>
      </q-btn>
    </q-toolbar>
    <router-view></router-view>
    <div slot="left">

      <q-list no-border link inset-delimiter>
        <q-item @click="changeRoute('/index')">
          个人主页
        </q-item>
        <q-item @click="changeRoute('/point')">
          兑换积分
        </q-item>
        <q-item @click="changeRoute('https://gitter.im/quasarframework/Lobby')">

        </q-item>
        <q-item @click="changeRoute('https://twitter.com/quasarframework')">

        </q-item>
      </q-list>
    </div>
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  } from 'quasar'
  import {mapGetters} from 'vuex';

  export default {
    name: 'index',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain
    },
    data() {
      return {
        headName: '个人主页'
      }
    },
    computed: {
      ...mapGetters(['headerText', 'hashbackBtn'])
    },
    methods: {
      changeRoute(route) {
        switch (route) {
          case '/index':
            this.headName = '个人主页';
            break;
          case '/point':
            this.headName = '积分兑换马币';
            break;
        }
        this.$refs.layout.toggleLeft()
        this.$router.push(route);
      },
      back() {
        window.history.go(-1)
      }
    },
    mounted() {

    }

  }
</script>

<style lang="scss">
  .q-toolbar-title {
    text-align: center
  }

  .layout-page {
    background-color: rgba(204, 204, 204, 0.27)
  }
</style>
