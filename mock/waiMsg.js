export default [
    {
        url:'/api/v1/agent/waiting/integrations',
        type:'post',
        response:() =>{
           return {
            code: 2000,
            data:{
                data:[
                    {
                       value: 10, 
                       member: {
                        avatar: '1',
                        nickname: '2',
                        id: '12',
                        addtime: '2019-09-02'
                       }
                    }
                ]
            }
           }
        }
    }
]