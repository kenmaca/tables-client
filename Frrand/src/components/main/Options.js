import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Image
} from 'react-native';
import {
  Colors, Sizes
} from '../../Const';

export default class Options extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Image
            source={require('../../../res/media/logo.png')}
            style={styles.logo} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.InnerFrame,
    backgroundColor: Colors.ModalBackground
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  logo: {
    width: 20,
    height: 20
  }
});
