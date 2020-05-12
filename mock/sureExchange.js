export default [
    {
        url:`/api/v1/agent/exchange/bi/confirm`,
        type:'post',
        response:() =>{
           return {
            data:{
                code: 2000,
            }
           }
        }
    }
]