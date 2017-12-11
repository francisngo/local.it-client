import yelpConfig from '../auth/yelpConfig';

const clientId = yelpConfig.appId;
const clientSecret = yelpConfig.appSecret;

let accessToken = '';

export default Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, {method: 'POST'})
    .then(response => {
      // console.log('accessToken response: ', response);
      return response.json()
    })
    .then(jsonResponse => {
      // console.log('accessToken jsonResponse: ', jsonResponse);
      accessToken = jsonResponse.access_token;
    });
  },

  search(term, location, limit) {
    // console.log('line 23');
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    })
    .then(response => {
      // console.log('line 32');
      // console.log('search response: ', response);
      return response.json();
    })
    .then(jsonResponse => {
      // console.log('search jsonResponse: ', jsonResponse);
      return jsonResponse
    });
  }

};
