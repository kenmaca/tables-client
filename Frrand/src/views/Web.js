import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Linking, WebView, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';

// components
import CloseButton from '../components/common/CloseButton';

export default class Web extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CloseButton back />
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
    paddingTop: Sizes.OuterFrame * 3,
    backgroundColor: Colors.Background
  }
});
