export default [
    {
      url: `/api/v1/agent/transfer/integration/request/id/tobi`,
      type: 'post',
      response:() =>{
        return {
            code: 2000,
            data:{
            }
        }
      }
    }
]