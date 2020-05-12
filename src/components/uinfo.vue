<template>
  <div class="cont">
    <div class="f-list">
      <q-list highlight>
        <q-item>
          <q-item-side :avatar="infomation.avatar"/>
          <q-item-main>
            <q-item-tile label>{{infomation.nickname}}</q-item-tile>
            <q-item-tile sublabel>id号：{{infomation.id}}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile label>{{infomation.addtime | getNowFormatDate }}</q-item-tile>
            <q-item-tile sublabel>关注</q-item-tile>
          </q-item-side>
        </q-item>
      </q-list>
    </div>
    <div class="user-handle-list">
      <q-list @click="sendBi('bi')">
        <q-item>
          <q-item-side avatar="/statics/images/bi.png"/>
          <q-item-main>
            <q-item-tile>送他马币</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list @click="sendBi('dope')">
        <q-item>
          <q-item-side avatar="/statics/images/dope.png"/>
          <q-item-main>
            <q-item-tile>送他兴奋剂</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list highlight @click="changeRoute('reward', infomation.id)">
        <q-item>
          <q-item-side avatar="/statics/images/message.png"/>
          <q-item-main>
            <q-item-tile>打赏消息</q-item-tile>
          </q-item-main>
          <q-item-side right v-if="infomation.message_count">
            <span class="msgCount">{{infomation.message_count}}</span>
          </q-item-side>
        </q-item>
      </q-list>
      <q-list @click="changeRoute('presenter', infomation.id)">
        <q-item>
          <q-item-side avatar="/statics/images/heart.png"/>
          <q-item-main>
            <q-item-tile>赠送记录</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
    <q-modal v-model="openModal" minimized :content-css="{padding: '40px 26px'}">
      <h4 class="sure-order" style="font-size: 18px;margin: 0">订单确认</h4>
      <q-list style="border: none;">
        <q-item>
          <q-item-side style="margin-right:12px" avatar="/statics/images/bi.png"/>
          <q-item-main>
            <q-item-tile>商品：马币</q-item-tile>
            <q-item-tile>数量：{{infomation.bi}}</q-item-tile>
            <q-item-tile>价格：{{infomation.price}}积分</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-btn color="primary" style="width: 100%;" @click="openModal = false">确定兑换</q-btn>
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
    Dialog, Toast
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
      Dialog, Toast
    },
    data() {
      return {
        openModal: false,
        money: 0,
        infomation: {},
        maxBi: 1231231,
        send: 0
      }
    },
    computed: {
      ...mapGetters(['currUserInfo'])
    },
    created() {
      api.userInfo(this.$route.query.id).then(({data}) => {
        console.log(data)
        let dat = data.data,
          code = data.code;
        if (code === 2000) {
          this.infomation = dat;
        }
      })
    },
    methods: {
      changeRoute(routerStr, query) {
        if (query) {
          this.$router.push({
            path: routerStr,
            query: {
              id: query
            }
          });
        } else {
          this.$router.push(routerStr);
        }

      },
      sendBi(type) {
        let max = 0,
          typeTxt = '',
          iconLabel = `<i class="icon ${type}"></i>`;
        if (type === 'bi') {
          typeTxt = '马币';
          max = this.currUserInfo.bi;
        } else {
          typeTxt = '兴奋剂';
          max = this.currUserInfo.dope;
        }

        Dialog.create({
          title: `最多可送:${max}`,
          form: {
            name: {
              type: 'number',
              label: iconLabel,
              model: ''
            }
          },
          buttons: [
            {
              label: '确定',
              color: '#fff',
              outline: true,
              style: 'text-decoration: underline;background-color: #f00',
              handler: (data) => {
                this.send = data.name;
                Dialog.create({
                  title: '确定要赠送',
                  message: `${data.name}${typeTxt}给${this.infomation.nickname}吗？`,
                  buttons: [
                    {
                      label: '确定',
                      color: 'secondary',
                      handler: () => {
                        console.log(this.send)
                      }
                    },
                    {
                      label: '取消',
                      color: 'positive',
                    }
                  ]
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
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .f-list {
    background-color: #fff;
    margin-top: 10px;
  }

  .user-handle-list {
    margin-top: 20px;
    background-color: #fff;
    .msgCount {
      border-radius: 50%;
      width: 24px;
      height: 24px;
      text-align: center;
      background-color: #f00;
      line-height: 24px;
      color: #fff;
    }
    .q-item-avatar, .q-item-avatar img {
      width: 28px;
      height: 28px;
    }
    .q-list + .q-list {
      margin-top: 0
    }
    .q-list {
      padding: 0;
      border-bottom: none;
    }
    .q-list:last-child {
      border: 1px solid #e0e0e0;
    }

  }

  .icon {
    width: 20px;
    height: 20px;
  }

  input.q-input-target {
    text-align: center;
  }

  .q-if-has-label .q-if-inner {
  }

  .full-width {
    padding-top: 1px
  }

  .modal-header {
    font-size: 1.1rem;
  }

  .modal-body {
    text-align: center;
  }

  .q-if-has-label .q-if-inner {
    text-align: left;
  }
</style>
