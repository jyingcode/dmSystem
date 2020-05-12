export default [
    {
      url: `/api/v1/agent/make/integration/request/id/processed`,
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