<template>
  <div class="cont">
    <div class="add_usr">
      <q-input v-model="user_id" type="number" :clearable="true" align="center" placeholder="请输入用户ID"/>
      <div class="btn">
        <q-btn color="primary" @click="searchUser()" :disable="user_id ? false : true">查询</q-btn>
      </div>
    </div>
    <q-modal v-model="openModal" minimized :content-css="{padding: '40px 26px'}">
      <q-list highlight style="border: none;">
        <q-item>
          <q-item-side :avatar="userInfo.avatar"/>
          <q-item-main>
            <q-item-tile label>{{userInfo.nickname}}</q-item-tile>
            <q-item-tile sublabel>id号：{{userInfo.id}}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <div @click="sure()">
        <q-btn color="primary" style="width: 100%;">确定关注</q-btn>
      </div>

    </q-modal>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QBtn,
    QModal,
    QInput
  } from 'quasar'
  import {mapGetters} from 'vuex';
  import * as api from 'api/index'

  export default {
    name: 'index',
    components: {
      QList,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QBtn,
      QModal,
      QInput
    },
    data() {
      return {
        openModal: false,
        user_id: null,
        userInfo: {}
      }
    },
    methods: {
      searchUser() {
        api.fetchUser(this.user_id).then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            this.openModal = true;
            this.userInfo = dat;
          }
        })
      },
      sure() {
        this.openModal = false;
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss">
  .add_usr {
    padding: 50px 10px;
    background: #fff;
    .btn {
      width: 70%;
      margin: 40px auto 30px;
      button {
        width: 100%
      }
    }
  }

</style>
