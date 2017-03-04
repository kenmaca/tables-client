import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes
} from '../../Const';
import {
  Actions
} from 'react-native-router-flux';

// components
import OutlinedButton from '../common/OutlinedButton';

export default class Options extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={Actions.option}>
          <View style={styles.buttons}>
            <OutlinedButton
              style={styles.optionSpacing}
              text='Table for 4' />
            <OutlinedButton
              style={styles.optionSpacing}
              text='Seafood' />
            <OutlinedButton
              style={styles.optionSpacing}
              text='Window Table' />
            <OutlinedButton
              style={styles.optionSpacing}
              text='Luxe ($$$$)' />
            <OutlinedButton
              highlight={Colors.Text}
              highlightFont={Colors.ModalBackground}
              text='+' />
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row'
  },

  optionSpacing: {
    marginRight: Sizes.InnerFrame / 2
  }
});
