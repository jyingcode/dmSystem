export default [
    {
      url: `api/v1/agent/transfer/prop/log`,
      type: 'post',
      response:() =>{
        return {
            code: 2000,
            data:{
                logs:[1,38,56],
                arr:[],
                PageCount:'4558',
                pageNo:'221525',
            }
        }
      }
    }
]