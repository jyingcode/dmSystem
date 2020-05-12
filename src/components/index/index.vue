<template>
  <div class="cont">
    <div class="user-info">
      <div class="row">
        <div class="col-3 ">
          <div class="user-img"><img :src="avatar" alt=""></div>
        </div>
        <div class="col-9 user-name">
          <p class="p1">{{nickname}}</p>
          <p class="p2">id号:{{userId}}</p>
        </div>
      </div>
    </div>
    <div class="user-goods">
      <div class="row">
        <div class="col-4 goods-list">
          <p class="p1"><i class="icon bi"></i>马币</p>
          <p class="p2">
            <i-count-up
              class="blue"
              :start="0"
              :end="bi"
              :decimals="0"
              :duration="2.5"
            ></i-count-up>
          </p>
        </div>
        <div class="col-4 goods-list">
          <p class="p1"><i class="icon dope"></i>兴奋剂</p>
          <p class="p2">
            <i-count-up
              class="blue"
              :start="0"
              :end="dope"
              :decimals="0"
              :duration="2.5"
            ></i-count-up>
          </p>
        </div>
        <div class="col-4 goods-list">
          <p class="p1"><i class="icon money"></i>积分</p>
          <p class="p2">
            <i-count-up
              class="blue"
              :start="0"
              :end="money"
              :decimals="0"
              :duration="2.5"
            ></i-count-up>
          </p>
        </div>
      </div>
    </div>
    <div class="user-handle-list">
      <q-list @click="changeRoute('/exdope', 'bi')">
        <q-item>
          <q-item-side avatar="/statics/images/bi.png"/>
          <q-item-main>
            <q-item-tile>马币兑换兴奋剂</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list @click="changeRoute('/exchange', 'dope')">
        <q-item>
          <q-item-side avatar="/statics/images/money.png"/>
          <q-item-main>
            <q-item-tile>积分兑换马币</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list @click="changeRoute('/customer')">
        <q-item>
          <q-item-side avatar="/statics/images/message.png"/>
          <q-item-main>
            <q-item-tile>待处理客服信息</q-item-tile>
          </q-item-main>
          <q-item-side right v-if="message_count">
            <span class="msgCount">{{message_count}}</span>
          </q-item-side>
        </q-item>
      </q-list>
      <q-list @click="changeRoute('/add')">
        <q-item>
          <q-item-side avatar="/statics/images/add.png"/>
          <q-item-main>
            <q-item-tile>添加关注用户</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
    <p>bggggg</p>
    <input type="file">
    <div class="user-friend">
      <div class="row top">
        <div class="col-6">我的关注用户({{flow}})</div>
        <div class="col-6">
          <q-input class="search" type="number" v-model="searchID" placeholder="请输入用户ID"/>
          <i class="searchBtn" @click="searchUser()">&nbsp;</i>
        </div>
      </div>
      <div class="f-list">
        <q-infinite-scroll :handler="loadMore">
          <q-list highlight v-if="friendList" v-for="(item, index) in friendList" key="index"
                  @click="viewUserInfo(item)">
            <q-item>
              <q-item-side :avatar="item.avatar"/>
              <q-item-main>
                <q-item-tile label>{{item.nickname}}</q-item-tile>
                <q-item-tile sublabel>id号：{{item.id}}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile label>{{item.addtime | getNowFormatDate}}</q-item-tile>
                <q-item-tile sublabel>关注</q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </q-infinite-scroll>
        <div class="center no_data" v-if="!friendList">您还没有关注用户！</div>
      </div>
      <!-- <p class="fetchMore" v-if="pageCount !== pageNo" @click="moreMemberList()">加载更多</p> -->
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
    QSearch,
    QInput,
    Alert,
    QInfiniteScroll
  } from 'quasar'
  import {mapGetters} from 'vuex';
  import * as api from 'api/index';
  import ICountUp from 'vue-countup-v2';
  import store from 'store'

  export default {
    components: {
      QList,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QSearch,
      QInput,
      Alert,
      ICountUp,
      QInfiniteScroll
    },
    data() {
      return {
        searchID: '',
        avatar: '',
        nickname: 'null',
        userId: null,
        bi: 0,
        dope: 0,
        money: 0,
        message_count: 0,
        flow: 3,
        search: 'asd',
        friendList: [],
        pageCount: 1,
        pageNo: 1,
        pageSize: 10

      }
    },
    computed: {
      ...mapGetters(['exchangeType'])
    },
    created() {
      api.profile().then(({data}) => {
        let dat = data.data,
          code = data.code;
        if (code === 2000) {
          store.dispatch('SetUserInfo', dat);
          this.avatar = dat.avatar;
          this.nickname = dat.nickname;
          this.userId = dat.id;
          
          this.bi = parseInt(dat.bi);
          this.dope = parseInt(dat.dope);
          this.money = parseInt(dat.money);
          this.message_count = dat.message_count;
        } else {
          Alert.create({
            html: '获取用户信息失败！'
          })
        }
      });

    },
    mounted() {

    },
    methods: {
      changeRoute(routerStr, exchangeType) {
        if (exchangeType) {
          this.$store.dispatch('ExchangeType', exchangeType);
        }
        this.$router.push(routerStr);
      },
      viewUserInfo(item) {
        this.$router.push({path: '/uinfo', query: {id: item.id}});
      },
      loadMore(index, done) {
        let parma = {};
        parma.pageNo = index,
          parma.pageSize = this.pageSize;
        if (this.searchID) {
          parma.mid = +this.searchID
        }
        api.memberList(parma).then(({data}) => {
          let dat = data.data,
            code = data.code;
          if (code === 2000) {
            let arr = this.friendList;
            this.friendList = [...arr, ...dat.members];
            this.pageCount = dat.pageCount;
            this.pageNo = dat.pageNo;
            this.flow = dat.total;
          }
          if (index === this.pageCount) {
            return
          }
          done();
        });
      },
      searchUser() {
        console.log(2)
        if (!this.searchID) {
          location.reload()
        } else {
          api.memberList({mid: +this.searchID}).then(({data}) => {
            let dat = data.data,
              code = data.code;
            if (code === 2000) {
              let arr = this.friendList;
              this.friendList = dat.members;
            }
          });
        }
      }
    }

  }
</script>

<style lang="scss">
  .cont {
    float: left;
    width: 100%;
    overflow: hidden;
  }

  .user-info {
    padding: 10px;
    background-color: #fff;
    margin-top: 14px;
    margin-bottom: 20px;
    .user-img {
      max-width: 100px;
      max-height: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      position: relative;
      padding-left: 20px;
      p {
        margin: 0;
      }
      .p1 {
        margin-top: 20px;
      }
      .p2 {
        margin-bottom: 0;
        vertical-align: bottom;
      }
    }
  }

  .user-goods {
    background-color: #fff;
    padding: 10px;
    .goods-list {
      border-right: 1px solid #e0e0e0;

      p {
        margin-bottom: 10px;
        text-align: center;
      }
      p:last-child {
        margin-bottom: 0;
        color: #027be3
      }
    }
    .goods-list:last-child {
      border: none
    }
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

  .user-friend {
    background-color: #fff;
    margin-top: 20px;
    padding: 10px;
    .top {
      height: 32px;
      line-height: 32px;
      .search {
        float: left;
        width: 84%;
      }
      .searchBtn {
        float: right;
        width: 28px;
        height: 28px;
        background: url("../../statics/images/search.png") no-repeat center center;
        background-size: cover;
      }
      .q-if {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    .f-list {
      margin-top: 16px;
    }
    .q-list {
      border: none;
      border-bottom: 1px solid #e0e0e0;
    }
    .q-list + .q-list {
      margin-top: 0;
    }
    .q-if {
      padding-bottom: 0
    }

  }

  .fetchMore {
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 0
  }
</style>
