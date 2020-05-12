// import Cookies from 'js-cookie';

const app = {
  state: {
    apiLoad: false,
    headerText: '个人主页',
    hashbackBtn: false,
    exchangeType: 'bi',
    userInfo: {}
  },
  mutations: {
    APP_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    APP_LOAD_STATUS: (state, status) => {
      state.apiLoad = status;
    },
    APP_HEAD_TEXT: (state, text) => {
      state.headerText = text;
    },
    APP_HEAD_BACK: (state, status) => {
      state.hashbackBtn = status;
    },
    APP_EXCHANGE_TYPE: (state, type) => {
      state.exchangeType = type;
    }
  },
  actions: {
    SetUserInfo: ({
      commit
    }, userInfo) => {
      commit('APP_USER_INFO', userInfo)
    },
    SetApiLoad: ({
      commit
    }, status) => {
      commit('APP_LOAD_STATUS', status)
    },
    SetHashBack: ({
      commit
    }, status) => {
      commit('APP_HEAD_BACK', status)
    },
    ChangeHeaderTxt: ({
      commit
    }, text) => {
      commit('APP_HEAD_TEXT', text)
    },
    ExchangeType: ({
      commit
    }, type) => {
      commit('APP_EXCHANGE_TYPE', type)
    }
  }
}

export default app;
