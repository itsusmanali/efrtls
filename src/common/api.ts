const fetchAPI = () => {
    let url = 'https://api.refactor.ro/football/fixtures';
    const token = 'oB5i2lAnkoCo4dLd8pI1avSLsiee9unDteaSdrgnco';
    let response = fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(rawResp => rawResp.json())
        .then((response) => {
            let fixtureData = response.response;
            return fixtureData;

        })
        .catch((err) => {
            console.warn('fetch error: ', err);
        })
    return response;
}
export default fetchAPI;