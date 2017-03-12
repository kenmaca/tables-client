import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, ScrollView
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';
import {
  Actions
} from 'react-native-router-flux';
import {
  callMore
} from './More';

// components
import ParallaxView from 'react-native-parallax-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/main/Header';
import Options from '../components/main/Options';
import AvailableList from '../components/restaurants/AvailableList';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        latitude: 0,
        longitude: 0
      }
    };

    // bindings
    this.getOptions = this.getOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.background = require('../../res/media/cover.jpg');
  }

  componentDidMount() {

    // update location continiously
    this.location = navigator.geolocation.watchPosition(
      position => this.setState({
        coords: position.coords
      }, () => callMore(
        this.state.coords,
        this.refs.options.getOptions && this.refs.options.getOptions()
      )), error => console.log(error), {
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnmount() {

    // clear location
    this.location && navigator.geolocation.clearWatch(this.location);

    // clear option change
    this.optionChange && clearTimeout(this.optionChange);
  }

  getOptions() {
    return this.refs.options && this.refs.options.getOptions();
  }

  onOptionChange() {

    // delayed change to wait for options to update and user to finalize
    // selection, and clear previously queued change
    this.optionChange && clearTimeout(this.optionChange);
    this.optionChange = setTimeout(() => {

      // ask for more restaurants
      this.refs.options && callMore(
        this.state.coords, this.refs.options.getOptions()
      );
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}>
          <Header coords={this.state.coords} />
          <View style={styles.list}>
            <View style={styles.offsetList}>
              <AvailableList
                ref='available'
                coords={this.state.coords}
                getOptions={this.getOptions} />
              <View style={styles.footer}>
                <View style={styles.bar}>
                  <View style={styles.separator} />
                  <MaterialIcon
                    style={styles.logo}
                    name='restaurant'
                    color={Colors.LightestText}
                    size={30} />
                  <View style={styles.separator} />
                </View>
                <Text style={styles.moreText}>
                  Restaurants will show up automatically above as soon
                  as they confirm availability
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Options
          ref='options'
          onChange={this.onOptionChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  list: {
    flex: 1,
    backgroundColor: Colors.Foreground
  },

  offsetList: {
    marginTop: -Sizes.OuterFrame * 2,
  },

  content: {
    minHeight: Sizes.Height
  },

  cards: {
    margin: Sizes.OuterFrame
  },

  footer: {
    paddingTop: Sizes.OuterFrame,
    alignItems: 'center',
    backgroundColor: Colors.Foreground
  },

  separator: {
    flex: 1,
    height: 0,
    borderTopColor: Colors.LightestText,
    borderTopWidth: 0.5,
  },

  bar: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: Sizes.InnerFrame,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    marginLeft: Sizes.InnerFrame,
    marginRight: Sizes.InnerFrame
  },

  moreText: {
    textAlign: 'center',
    marginBottom: Sizes.OuterFrame,
    paddingLeft: Sizes.OuterFrame * 2,
    paddingRight: Sizes.OuterFrame * 2,
    fontSize: Sizes.Text,
    fontWeight: Sizes.Light,
    color: Colors.LightestText
  },

  button: {
    marginBottom: Sizes.OuterFrame,
    backgroundColor: Colors.ModalBackground,
    padding: Sizes.InnerFrame,
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame,
    borderRadius: Sizes.OuterFrame,
  },

  buttonText: {
    fontSize: Sizes.H3,
    fontWeight: Sizes.Light,
    color: Colors.Text
  },

  ballContainer: {
    position: 'absolute',
    bottom: -Sizes.Height * 2,
    width: Sizes.Width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  ball: {
    width: Sizes.Height * 2,
    height: Sizes.Height * 2,
    borderRadius: Sizes.Height,
    backgroundColor: Colors.ModalBackground
  }
});
