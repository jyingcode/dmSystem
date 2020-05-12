export default [
    {
      url: '/api/v1/agent/member/list',
      type: 'post',
      response:() =>{
        return {
            code: 0,
            data:{
               data: 
               {
                avatar: '1',
                nickname: '2',
                id: '3',
                addtime: '2019-03-25'
               }
            }
        }
      }
    }
]