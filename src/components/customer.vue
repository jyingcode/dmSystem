<template>
  <div class="cont">
    <div class="processed">
      <div class="row headTitle">
        <div class="col-6">
          <q-chip color="red" :small="true">未处理</q-chip>
        </div>
        <div class="col-6 all">累计:
          <i-count-up
            class="blue"
            :start="0"
            :end="waitingAll"
            :decimals="0"
            :duration="2.5"
          ></i-count-up>
        </div>
      </div>
      <div v-if="waiting.length" class="f-list" v-for="(item, index) in waiting" key="index">
        <q-list>
          <q-item class="customer">
            <q-item-side :avatar="item.member.avatar"/>
            <q-item-main>
              <q-item-tile label>{{item.member.nickname}}</q-item-tile>
              <q-item-tile sublabel>id号：{{item.member.id}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile label>{{item.member.addtime | getNowFormatDate }}</q-item-tile>
              <q-item-tile sublabel>关注</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-main>
              <q-item-tile label><span class="moneyTxt red"><i-count-up
                class="blue"
                :start="0"
                :end="item.value"
                :decimals="0"
                :duration="2.5"
              ></i-count-up> </span><span class="mok">积分</span></q-item-tile>
              <q-item-tile label class="list-item-label" @click="markAsRecieve(item.id)">标记为收到</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile label>{{item.addtime}}</q-item-tile>
              <q-item-tile label class="list-item-label" @click="markAsMbi(item.id)">回赠为马币</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
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
    Dialog, Toast
  } from 'quasar'
  import ICountUp from 'vue-countup-v2';
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
      QInput,
      QChip,
      Dialog, Toast,
      ICountUp
    },
    data() {
      return {
        openModal: false,
        waiting: [],
        waitingAll: 0,
      }
    },
    computed: {
      ...mapGetters(['currUserInfo'])
    },
    created() {
      this.rewardInit();
    },
    methods: {
      rewardInit() {
        api.waitMsg().then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            this.waiting = dat;
            let watLen = dat.length,
              watAll = 0;
            for (var i = watLen - 1; i >= 0; i--) {
              watAll += dat[i].value;
            }
            this.waitingAll = watAll;
          }
        })
      },
      markAsRecieve(id) {
        Dialog.create({
          title: `您确定要标记为已收到吗？`,
          buttons: [
            {
              label: '确定',
              color: 'secondary',
              handler: () => {
                api.markReceive(id).then(({data}) => {
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
  .processed {
    margin-top: 20px;
    padding-top: 10px;
    .headTitle {
      margin-bottom: 10px;
      padding-left: 16px;
      padding-right: 16px;
      .all {
        color: #757575;
      }
      div {
        &:first-child {

        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .moneyTxt {
      color: #8aa9c3;
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
      margin-top: 0;
    }
    .customer {
      border: none
    }
    .f-list {
      margin-top: 20px;
      background: #fff;
    }
    .modal-header {
      font-size: 14px;
      color: #333;
    }
  }

</style>
