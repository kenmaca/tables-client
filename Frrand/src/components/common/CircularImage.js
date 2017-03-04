import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';

export default class CircularImage extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        this.props.style,
        this.props.size && {
          height: this.props.size,
          width: this.props.size,
          borderRadius: this.props.size / 2
        }
      ]}>
        <Image
          style={[
            styles.image,
            this.props.size && {
              height: this.props.size,
              width: this.props.size
            }
          ]}
          source={{
            uri: this.props.uri
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden'
  },

  image: {
    height: 100,
    width: 100
  }
});
