const getters = {
  currUserInfo: state => state.app.userInfo,
  apiLoad: state => state.app.apiLoad,
  headerText: state => state.app.headerText,
  hashbackBtn: state => state.app.hashbackBtn,
  exchangeType: state => state.app.exchangeType,

};
export default getters
