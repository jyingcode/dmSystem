<template>
  <div class="cont">
    <div class="f-list">
      <q-list>
        <q-item>
          <q-item-side :avatar="userInfo.avatar"/>
          <q-item-main>
            <q-item-tile label>{{userInfo.nickname}}</q-item-tile>
            <q-item-tile sublabel>id号：{{userInfo.id}}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile label>{{userInfo.addtime | getNowFormatDate }}</q-item-tile>
            <q-item-tile sublabel>关注</q-item-tile>
          </q-item-side>
        </q-item>
      </q-list>
    </div>
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
      <q-list>
        <q-item v-for="(item, index) in waiting" key="index">
          <q-item-main>
            <q-item-tile label><span class="moneyTxt red"> <i-count-up
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
    <div class="processed">
      <div class="row headTitle">
        <div class="col-6">
          <q-chip color="secondary" :small="true">已处理</q-chip>
        </div>
        <div class="col-6 all">累计:
          <i-count-up
            class="blue"
            :start="0"
            :end="processedAll"
            :decimals="0"
            :duration="2.5"
          ></i-count-up>
        </div>
      </div>
      <q-list>
        <q-item v-for="(item, index) in processed" key="index">
          <q-item-main>
            <q-item-tile label><span class="moneyTxt">
               <i-count-up
                 class="blue"
                 :start="0"
                 :end="item.value"
                 :decimals="0"
                 :duration="2.5"
               ></i-count-up>
                  </span><span class="mok">积分</span></q-item-tile>
            <q-item-tile sublabel>{{item.addtime}}<span class="mok">申请</span></q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile label>已处理</q-item-tile>
            <q-item-tile sublabel>{{item.handletime}}<span
              class="mok">{{item.handletype == 'transfer' ? '回赠为马币' : ''}}</span></q-item-tile>
          </q-item-side>
        </q-item>
      </q-list>
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
  } from 'quasar';
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
        processed: [],
        userInfo: {},
        processedAll: 0,
        waitingAll: 0,
        pageCount: 1,
        pageNo: 1,
        pageSize: 10
      }
    },
    computed: {
      ...mapGetters(['currUserInfo'])
    },
    created() {
      this.rewardInit();
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
      rewardInit() {
        api.reward(this.$route.query.id).then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            this.userInfo = dat.member;
            this.waiting = dat.waiting;
            this.processed = dat.processed;
            let watLen = dat.waiting.length,
              proLen = dat.processed.length,
              watAll = 0,
              proAll = 0;
            for (var i = watLen - 1; i >= 0; i--) {
              watAll += dat.waiting[i].value;
            }
            for (var i = proLen - 1; i >= 0; i--) {
              proAll += dat.processed[i].value;
            }
            this.processedAll = proAll;
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
    background: #fff;
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
      padding: 0
    }
  }

</style>
