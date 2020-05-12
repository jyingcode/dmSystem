export default [
    {
        url:`/api/v1/agent/id/integrations`,
        type:'post',
        response:() =>{
           return {
            data:{
                code: 2000,
                data:{
                    member:'',
                    processed:[],
                    waiting:[],
                }
            }
           }
        }
    }
]