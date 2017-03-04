import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';
import {
  Actions
} from 'react-native-router-flux';
import Firebase from '../utils/Firebase';

// components
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

// animatable
let AnimatableIcon = Animatable.createAnimatableComponent(MaterialIcon);

export default class More extends Component {
  componentDidMount() {

    // animate loader
    this.flipFirst = this.flipFirst.bind(this);
    this.flipSecond = this.flipSecond.bind(this);
    this.flipFirst();

    // signal new task to pull new restaurants
    navigator.geolocation.getCurrentPosition(
      position => {
        Firebase.database().ref('tasks').push({
          coords: position.coords
        });
      }, error => console.log(error), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  flipFirst() {
    this.refs.first.flipInY(500).then(() => {
      this.refs.first.flipOutY(500).then(this.flipSecond).catch(() => {});
    }).catch(() => {});
  }

  flipSecond() {
    this.refs.second.flipInY(500).then(() => {
      this.refs.second.flipOutY(500).then(this.flipFirst).catch(() => {});
    }).catch(() => {});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Pronto is looking for more tables
          </Text>
          <Text style={styles.text}>
            We find real-time restaurant availability by calling matching
            nearby restaurants directly, so this may take a few minutes
          </Text>
          <View style={styles.loader}>
            <AnimatableIcon
              style={styles.icon}
              ref='first'
              name='restaurant'
              color={Colors.Text}
              size={30} />
            <AnimatableIcon
              style={styles.icon}
              ref='second'
              name='phone'
              color={Colors.Text}
              size={30} />
          </View>
        </View>
        <TouchableOpacity
          onPress={Actions.main}
          style={styles.close}>
          <Text style={styles.closeText}>
            OK — We'll notify you when we find new tables
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ModalBackground
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.OuterFrame * 2
  },

  title: {
    marginBottom: Sizes.InnerFrame,
    textAlign: 'center',
    fontSize: Sizes.H2,
    fontWeight: Sizes.Light,
    color: Colors.Text
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H3,
    fontWeight: Sizes.Light,
    color: Colors.Text
  },

  loader: {
    marginTop: Sizes.OuterFrame * 3
  },

  close: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.OuterFrame,
    backgroundColor: Colors.Background
  },

  closeText: {
    fontSize: Sizes.Text,
    color: Colors.Text
  },

  icon: {
    position: 'absolute',
    top: 0,
    left: -10,
    opacity: 0
  }
});