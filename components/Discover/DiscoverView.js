import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import categories from '../../data/categories.js';
import store from '../../store/locationStore';
import Yelp from '../../utils/yelp';

export default class Discover extends Component {

  constructor (props) {
    super(props);
    this.state = {
      error: null,
      categories: categories,
    };
    this.fetchYelpData = this.fetchYelpData.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        store.dispatch({
          type: 'GET_LOCATION',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        // console.log('position:', position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  //Yelp Fetch
  fetchYelpData(title) {
    // console.log('line 42');
    let term = title;
    let lat = store.getState().latitude;
    let lng = store.getState().longitude;
    // console.log('lat: ', lat);
    // console.log('lng: ', lng);
    let location = String(lat) + ',' + String(lng);
    let limit = '30';
    // console.log('location: ', location);
    Yelp.search(term, location, limit).then(data => {
      // console.log('yelp data:', data);
      this.props.navigation.navigate('CategoryView', {
        data: data.businesses,
        category: title
      });
    })
    .catch(err => console.log(err));

    // yelp.accessToken(clientId, clientSecret).then(response => {
    //   const client = yelp.client(response.jsonBody.access_token);
    //
    //   client.search(searchRequest).then(response => {
    //     console.log(response);
    //   });
    // }).catch(err => console.log(err));
    //
    // yelp.search(params)
    //   .then((data) => {
    //     console.log(data);
    //     this.props.navigation.navigate('CategoryView', {
    //       data: data.businesses,
    //       category: title
    //     })
    //   })
    //   .catch((err) => console.log(err));
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.categories}
          keyExtractor={(category, index) => index }
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={ () =>  this.fetchYelpData(item.title) }>
              <ImageBackground
                style={styles.image}
                source={{uri: item.image_url}}
              >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.title}</Text>

                </View>
              </ImageBackground>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbarTab: {
    fontSize: 20
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: 100,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderLeftColor: 'gray',
    borderRightColor: 'gray',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.4)',
    height:100,
    width: 400,
    padding: 10
  },
  text: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    color: '#F7F7F7',
    fontFamily: 'Avenir Light',
    fontSize: 18
  },
})
