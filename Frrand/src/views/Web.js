import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Linking, WebView
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';

export default class Web extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref='web'
          source={{
            uri: this.props.uri
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Sizes.OuterFrame
  }
});
