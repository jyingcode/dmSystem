<template>
  <div class="cont">
    <div class="exchange">
      <p class="myMoney">可用马币:&nbsp;&nbsp;{{money}}</p>
      <div class="exchangeBox">
        <p>兑换兴奋剂<i class="icon dope"></i></p>
        <div class="row">
          <div class="col-4 list-item" v-for="(item, index) in exchangeList" @click="exchange (item)">
            <div class="item-box" :key="index">
              <p class="p1">{{item.bi}}</p>
              <p class="p2">{{item.price}}马币</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-modal v-model="openModal" minimized :content-css="{padding: '40px 26px'}">
      <h4 class="sure-order" style="font-size: 18px;margin: 0">订单确认</h4>
      <q-list style="border: none;">
        <q-item>
          <q-item-side style="margin-right:12px" avatar="/statics/images/dope.png"/>
          <q-item-main>
            <q-item-tile>商品：兴奋剂</q-item-tile>
            <q-item-tile>数量：{{currentSell.bi}}</q-item-tile>
            <q-item-tile>价格：{{currentSell.price}}马币</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-btn color="primary" style="width: 100%;" @click="sureEx('dope')">确定兑换</q-btn>
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
    Toast
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
      Toast
    },
    data() {
      return {
        openModal: false,
        money: 0,
        exchangeList: [],
        currentSell: {
          money: 0,
          price: 0
        },
      }
    },
    computed: {
      ...mapGetters(['exchangeType'])
    },
    created() {
      api.exchange(this.exchangeType).then(({data}) => {
        console.log(data)
        let dat = data.data,
          code = data.code;
        if (code === 2000) {
          this.exchangeList = dat.sells;
          this.money = dat.money;
        }
      })
    },
    methods: {
      exchange(item) {
        this.openModal = true;
        this.currentSell = item;
      },
      sureEx(type) {
        this.openModal = false;
        api.sureExchange(type).then(({data}) => {
          let code = data.code;
          if (code === 2000) {
            Toast.create.positive({
              html: '兑换成功',
              icon: 'alarm_add',
              timeout: 2500,
              color: '#fff',
              bgColor: 'white',
            })
          } else {
            Toast.create.warning({
              html: '兑换失败',
              icon: 'alarm_add',
              timeout: 2500,
              color: '#fff',
              bgColor: 'white',
            })
          }
        })
      }
    },
    mounted() {

    }

  }
</script>

<style lang="scss">
  .cont {
    float: left;
    width: 100%;
    overflow: hidden;
  }

  .exchange {
    padding-bottom: 14px;
    .myMoney {
      margin-top: 20px;
      padding-left: 10px;
    }
    .exchangeBox {
      background: #fff;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 20px;
      box-shadow: 1px 5px 12px 1px rgba(204, 204, 204, 0.53);

    }
    .list-item {
      padding-right: 14px;
      padding-bottom: 14px;
      &:nth-child(3n) {
        padding-right: 0;
      }
      .item-box {
        border: 1px solid #027be3;
        text-align: center;
        padding: 10px 0;
        p {
          color: #027be3;
          margin-bottom: 0;
        }
      }
    }
    .icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: -5px;
      margin-left: 10px;
    }

    .bi {
      background: url("../statics/images/bi.png") no-repeat center center;
      background-size: cover;
    }

    .dope {
      background: url("../statics/images/dope.png") no-repeat center center;
      background-size: cover;
    }

    .money {
      background: url("../statics/images/money.png") no-repeat center center;
      background-size: cover;
    }

  }


</style>
