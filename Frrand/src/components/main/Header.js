import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../Const';
import Geocoder from 'react-native-geocoder';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: 'Nearby'
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => Geocoder.geocodePosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }).then(location => {
        if (location[0]) {
          this.setState({
            region: [
              location[0].locality, location[0].adminArea
            ].filter(l => l).join(', ') || 'Nearby',
            coords: position.coords
          });
        }
      }), error => console.log(error), {
        timeout: 20000,
        maximumAge: 1000
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>RESTAURANTS AVAILABLE IN</Text>
        <Text style={styles.title}>
          {this.state.region}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: Sizes.OuterFrame
  },

  title: {
    color: Colors.Text,
    fontSize: Sizes.H2,
    fontWeight: Sizes.Bold
  },

  subtitle: {
    color: Colors.Text,
    fontSize: Sizes.SmallText,
    marginBottom: Sizes.InnerFrame / 4
  }
});
