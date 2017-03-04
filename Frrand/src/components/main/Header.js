import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../Const';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>RESTAURANTS CURRENTLY AVAILABLE IN</Text>
        <Text style={styles.title}>
          Toronto, ON
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
    padding: Sizes.OuterFrame
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
