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
import {
  callMore
} from '../../views/More';

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

    // bindings
    this.callIfEmpty = this.callIfEmpty.bind(this);
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
              data: this.state.data.cloneWithRows(
                Object.keys(this.restaurants
              ).sort(
                (a, b) => (
                  this.restaurants[a].distance > this.restaurants[b].distance
                  ? 1: -1
                )
              ))
            });
          }
        );

      }, error => console.log(error), {
        timeout: 20000,
        maximumAge: 1000
      }
    );

    // initial trigger to update view from server
    this.callIfEmpty();
  }

  componentWillUnmount() {
    this.gfEntered && this.gfEntered.cancel();
    this.timer && clearTimeout(this.timer);
  }

  callIfEmpty() {
    this.timer && clearTimeout(this.timer);
    if (Object.keys(this.restaurants).filter(
      restaurant => Date.now() <= this.restaurants[restaurant].availableUntil
    ).length < 6) callMore(this.props.getOptions());

    // and check again in two minutes
    this.timer = setInterval(this.callIfEmpty, 120000);
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
