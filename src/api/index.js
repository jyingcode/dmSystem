/**
 * Created by zhouxinran on 2017/8/17.
 */
import fetch from 'util/fetch';
export function profile(data) {
  return fetch({
    url: '/api/v1/agent/home/profile',
    method: 'post',
    data
  });
}

export function memberList(data) {
  return fetch({
    url: '/api/v1/agent/member/list',
    method: 'post',
    data
  });
}

// 未处理客服信息列表

export function waitMsg(type) {
  return fetch({
    url: `/api/v1/agent/waiting/integrations`,
    method: 'post',
  });
}

// 积分兑换马币和兴奋剂

export function exchange(type) {
  return fetch({
    url: `/api/v1/agent/exchange/${type}/list`,
    method: 'post',
  });
}

// 确认兑换马币和兴奋剂

export function sureExchange(type) {
  return fetch({
    url: `/api/v1/agent/exchange/${type}/confirm`,
    method: 'post',
  });
}


// 查询关注ID

export function fetchUser(data) {
  return fetch({
    url: `/api/v1/agent/get/member/byid`,
    method: 'post',
    data
  });
}
// 用户详细信息

export function userInfo(id) {

  return fetch({
    url: `/api/v1/agent/member/${id}/detail`,
    method: 'post',
  });
}

// 打赏记录

export function reward(id) {

  return fetch({
    url: `/api/v1/agent/${id}/integrations`,
    method: 'post',
  });
}

// 标记为收到

export function markReceive(id) {

  return fetch({
    url: `/api/v1/agent/make/integration/request/${id}/processed`,
    method: 'post',
  });
}

// 标记为收到获取积分申请转为马币信息

export function markMbi(id) {

  return fetch({
    url: `/api/v1/agent/transfer/integration/request/${id}/tobi`,
    method: 'post',
  });
}

// 赠送记录

export function presendLog(data) {

  return fetch({
    url: `api/v1/agent/transfer/prop/log`,
    method: 'post',
    data
  });
}
