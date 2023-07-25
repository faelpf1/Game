export default async function postAxios(url, stateId, level=-1){
    return axios.post(url, {
        "stateId": stateId,
        "level": level,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}