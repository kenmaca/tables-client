import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Alert, Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Strings
} from '../Const';
import Firebase from '../utils/Firebase';

// components
import * as Animatable from 'react-native-animatable';

// const
let AnimatedImage = Animatable.createAnimatableComponent(Image);

/**
 * Handles logging in and redirection to an appropriate View
 * either on app launch or after a login/registration was processed.
 */
export default class Loader extends Component {
  componentDidMount() {

    // handle version check before anything else
    Firebase.database().ref('config').once('value', config => {
      config = config.val();

      // unsupported client, so prompt user to update
      if (!config || config.minimumVersion > Strings.ClientVersion) {
        Alert.alert(
          `Please update ${Strings.AppName}`,
          `You are currently running an older version of ${Strings.AppName} `
            + 'that is no longer supported'
        );
      } else {

        // register anonymously or resume
        this.authListener = Firebase.auth().onAuthStateChanged(user => {
          if (user) {
            Actions.main();
          } else {

            // TODO: move this to post-onboarding screens
            Firebase.auth().signInAnonymously().catch(
              error => Alert.alert(
                `Service temporarily unavailable (${error.code})`,
                error.message
              )
            );
          }
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedImage
          ref='logo'
          animation='bounce'
          iterationCount='infinite'
          source={require('../../res/media/logo.png')}
          style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary
  },

  logo: {
    width: 30,
    height: 30
  }
});
