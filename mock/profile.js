export default [
    {
        url:'/api/v1/agent/home/profile',
        type:'post',
        response:() =>{
           return {
            code: 2000,
            data:{
                money: '8',
                avatar: '1',
                nickname: '2',
                id: 'JavaScript',
                bi: '87878',
                dope: '545',
                message_count:'90'
            }
           }
        }
    }
]