import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';
import Firebase from '../../utils/Firebase';
import Geofire from 'geofire';

// components
import Card from './Card';

export default class AvailableList extends Component {
  constructor(props) {
    super(props);

    this.gf = new Geofire(
      Firebase.database().ref('nearby')
    );
    this.restaurants = {};
    this.state = {
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {

    // pull nearby from firebase based on location
    navigator.geolocation.getCurrentPosition(
      position => {
        this.gfQuery = this.gf.query({
          center: [
            position.coords.latitude,
            position.coords.longitude
          ],
          radius: 20
        });

        // as restaurants appear, queue for appearance
        this.gfEntered = this.gfQuery.on(
          'key_entered',
          (key, coords, distance) => {
            this.restaurants[key] = {
              coords: coords,
              distance: distance
            };

            // update display
            this.setState({
              data: this.state.data.cloneWithRows(Object.keys(this.restaurants).sort(
                (a, b) => (
                  this.restaurants[a].distance > this.restaurants[b].distance
                  ? 1: -1
                )
              ))
            });
          }
        );

      }, error => console.log(error), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnmount() {
    this.gfEntered && this.gfEntered.cancel();
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.data}
        renderRow={data => (
          <Card
            id={data}
            distance={this.restaurants[data].distance} />
        )} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: Sizes.OuterFrame
  }
});
