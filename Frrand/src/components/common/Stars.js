import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';

// components
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class Stars extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          new Array(5).fill(null).map((star, i) => {
            if (this.props.rating >= i + 1) {
              return (
                <MaterialIcon
                  key={i}
                  name='star'
                  size={this.props.size || 15}
                  color={this.props.color || Colors.ModalBackground} />
              );
            } else if (this.props.rating >= i + 0.5) {
              return (
                <MaterialIcon
                  key={i}
                  name='star-half'
                  size={this.props.size || 15}
                  color={this.props.color || Colors.ModalBackground} />
              );
            } else {
              return (
                <MaterialIcon
                  key={i}
                  name='star-border'
                  size={this.props.size || 15}
                  color={this.props.color || Colors.ModalBackground} />
              );
            }
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
