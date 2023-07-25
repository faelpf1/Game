export default async function getAxios(url){
    return await axios.get(url)
    .then((res) => { 
        return res.data[0].level;
    })
    .catch( (error) => console.log(error) )
    .finally( () => {} );
}