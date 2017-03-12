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

  componentWillReceiveProps(props) {
    props.coords
    && props.coords.latitude !== this.props.coords.latitude
    && props.coords.longitude !== this.props.coords.longitude
    && Geocoder.geocodePosition({
      lat: props.coords.latitude,
      lng: props.coords.longitude
    }).then(location => {
      if (location[0]) {
        this.setState({
          region: [
            (
              location[0].subLocality
              || location[0].locality
              || location[0].subAdminArea
            ),
            location[0].adminArea || location[0].country
          ].filter(l => l).join(', ') || 'Nearby'
        });
      }
    }).catch(e => console.log(e));
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
    padding: Sizes.OuterFrame,
    paddingTop: Sizes.OuterFrame * 3,
    paddingBottom: Sizes.OuterFrame * 2
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
