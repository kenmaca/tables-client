import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';
import {
  Actions
} from 'react-native-router-flux';

// components
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OutlinedButton from '../components/common/OutlinedButton';

export default class Option extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            How big is your party?
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.options}>
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='1' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='2' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='3' />
            <OutlinedButton
              highlight={Colors.ModalBackground}
              highlightFont={Colors.Text}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='4' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='5' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='6' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='7' />
            <OutlinedButton
              color={Colors.Background}
              style={styles.optionSpacing}
              size={Sizes.H3}
              text='8' />
          </View>
          <TouchableOpacity
            onPress={Actions.pop}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Update party size
            </Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            More than 8 people in your party?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.close}
          onPress={Actions.pop}>
          <MaterialIcon
            name='arrow-back'
            color={Colors.Text}
            size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Foreground
  },

  header: {
    padding: Sizes.OuterFrame,
    paddingTop: Sizes.OuterFrame * 3,
    backgroundColor: Colors.Background
  },

  title: {
    fontSize: Sizes.H1,
    fontWeight: Sizes.Light,
    color: Colors.Text
  },

  body: {
    flex: 1,
    padding: Sizes.OuterFrame
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    marginTop: Sizes.OuterFrame,
    alignSelf: 'center',
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

  disclaimer: {
    marginTop: Sizes.InnerFrame,
    textAlign: 'center',
    fontSize: Sizes.Text,
    fontWeight: Sizes.Light
  },

  close: {
    position: 'absolute',
    top: Sizes.OuterFrame,
    left: Sizes.InnerFrame / 3,
    padding: Sizes.InnerFrame,
    backgroundColor: Colors.Transparent
  }
});
