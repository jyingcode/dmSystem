<template>
  <div class="cont ">
    <div class="row filter">
      <div class="col-8">
        <q-btn :class=" prop === 'bi' ? 'active': '' " small @click="filterLog('bi')">马币</q-btn>
        <q-btn :class=" prop === 'dope' ? 'active': '' " small @click="filterLog('dope')">兴奋剂</q-btn>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="presenter">
      <q-infinite-scroll :handler="loadMore">
        <q-list highlight v-for="(item, index) in logs" key="key">
          <q-item>
            <q-item-side :avatar="item.avatar"/>
            <q-item-main>
              <q-item-tile label>{{item.nickname}}</q-item-tile>
              <q-item-tile sublabel>{{item.addtime}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile label class="moneyTxt">
                <i-count-up
                  class="blue"
                  :start="0"
                  :end="item.value"
                  :decimals="0"
                  :duration="2.5"
                ></i-count-up>
              </q-item-tile>
              <q-item-tile sublabel><i class="icon" :class="[item.prop == 'bi' ? 'bi' : 'dope']"></i><span class="mok">{{item.prop == 'bi' ? '马币' : '兴奋剂'}}</span>
              </q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </q-infinite-scroll>
    </div>
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
    QInput,
    QChip,
    Dialog, Toast,
    QInfiniteScroll
  } from 'quasar'
  import ICountUp from 'vue-countup-v2';
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
      QInput,
      QChip,
      Dialog,
      Toast,
      QInfiniteScroll,
      ICountUp
    },
    data() {
      return {
        prop: '',
        user_id: null,
        logs: [],
        pageCount: 1,
        pageNo: 1,
        pageSize: 10
      }
    },
    created() {


      // this.logInit({mid:this.$route.query.id});
    },
    methods: {
      loadMore(index, done) {
        let id = this.$route.query.id;
        this.user_id = parseInt(id);
        let parma = {};
        parma.mid = this.user_id,
          parma.pageNo = index,
          parma.pageSize = this.pageSize;
        if (this.prop) {
          parma.prop = this.prop === 'bi' ? 'bi' : 'dope';
        }
        api.presendLog(parma).then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            this.logs = dat.logs;
            this.friendList = [...arr, ...dat.logs];
            this.pageCount = dat.PageCount || 1;
            this.pageNo = dat.pageNo || 1;
          }
          if (index === this.pageCount) {
            return
          }
          done();
        })
      },
      logInit(parmaObj) {
        api.presendLog(parmaObj).then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            this.logs = dat.logs;
          }
        })
      },
      filterLog(type) {
        let parma = {};
        this.prop = type;
        parma.mid = this.user_id;
        parma.prop = this.prop;
        this.logInit(parma);
      },
      markAsMbi(id) {
        Dialog.create({
          title: `您确定回赠为马币吗？`,
          buttons: [
            {
              label: '确定',
              color: 'secondary',
              handler: () => {
                api.markMbi(id).then(({data}) => {
                  let dat = data.data,
                    code = data.code;
                  if (code === 2000) {
                    this.rewardInit();
                    Toast.create.positive({
                      html: '已经成功处理',
                      icon: 'alarm_add',
                      timeout: 2500,
                      color: '#fff',
                      bgColor: 'white',
                    })
                  }
                })
              }
            },
            {
              label: '取消',
              color: 'positive',
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss">
  .filter {
    margin-top: 20px;
    padding: 0 16px;
    .active {
      background: #027be3;
      color: #fff;
    }
  }

  .presenter {
    background: #fff;
    margin-top: 20px;

    .moneyTxt {
      color: #027be3;
      font-weight: 800;
    }
    .mok {
      font-size: 10px;
      margin-left: 6px;
    }
    .q-list {
      border: none
    }
    .q-item {
      border-bottom: 1px solid #e0e0e0;
    }
    .list-item-label {
      margin-top: 10px;
      color: #027be3;
    }
    .red {
      color: #f00;
    }
    .q-list {
      padding: 0;
      margin-top: 0
    }
    .icon {
      width: 14px;
      height: 14px;
      vertical-align: -2px;
      margin-right: 2px;
    }
  }

</style>
