import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView
} from 'react-native';

// TODO: replace with native in RN43
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList';
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

    // location
    this.gf = new Geofire(
      Firebase.database().ref('nearby')
    );
    this.gfQuery = this.gf.query({
      center: [
        this.props.coords.latitude,
        this.props.coords.longitude
      ],
      radius: 10
    });

    // rows
    this.state = {
      restaurants: {},
      sorted: []
    };

    // bindings
    this.filter = this.filter.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(props) {

    // new coords incoming, update list
    this.gfQuery.updateCriteria({
      center: [
        props.coords.latitude,
        props.coords.longitude
      ]
    });
  }

  getRestaurantOrder(restaurants) {
    return Object.keys(
      restaurants
    ).sort(
      (a, b) => (
        restaurants[a].distance > restaurants[b].distance
        ? 1: -1
      )
    );
  }

  componentDidMount() {
    this.gfEntered = this.gfQuery.on(
      'key_entered',
      (key, coords, distance) => {
        let restaurants = Object.assign(
          this.state.restaurants,
          {
            [key]: {
              coords: coords,
              distance: distance
            }
          }
        );

        // update display
        this.setState({
          restaurants: restaurants,
          sorted: this.getRestaurantOrder(restaurants)
        });
      }
    );

    this.gfExited = this.gfQuery.on(
      'key_exited',
      (key, coords, distance) => {
        let restaurants = this.state.restaurants;
        delete restaurants[key];

        // update display
        this.setState({
          restaurants: restaurants,
          sorted: this.getRestaurantOrder(restaurants)
        });
      }
    )
  }

  componentWillUnmount() {
    this.gfEntered && this.gfEntered.cancel();
    this.gfExited && this.gfExited.cancel();
  }

  filter(restaurant) {
    let options = this.props.getOptions();

    // price range
    return restaurant.price && (
      !options.price
      || options.price === restaurant.price.length

    // category filter
    ) && (
      options.options.length <= 0
      || restaurant.categories.filter(
        category => options.options.indexOf(category.alias) > -1
      ).length > 0
    )
  }

  renderItem(restaurant) {
    return (
      <Card
        filter={this.filter}
        id={restaurant.item}
        distance={this.state.restaurants[restaurant.item].distance} />
    )
  }

  render() {
    return (
      <FlatList
        key='restaurants'
        keyExtractor={(item, i) => i}
        style={styles.container}
        data={this.state.sorted}
        renderItem={this.renderItem} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: Sizes.InnerFrame,
    marginBottom: Sizes.InnerFrame
  }
});
