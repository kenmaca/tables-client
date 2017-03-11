import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';

export default class OutlinedButton extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        this.props.style,
        this.props.color && {
          borderColor: this.props.color
        },
        this.props.highlight && {
          borderColor: this.props.highlight,
          backgroundColor: this.props.highlight
        }
      ]}>
        <Text style={[
          styles.text,
          this.props.color && {
            color: this.props.color
          },
          this.props.highlightFont && {
            color: this.props.highlightFont
          },
          this.props.size && {
            fontSize: this.props.size
          }
        ]}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Sizes.InnerFrame / 4,
    paddingBottom: Sizes.InnerFrame / 4,
    paddingLeft: Sizes.InnerFrame / 2,
    paddingRight: Sizes.InnerFrame / 2
  },

  text: {
    backgroundColor: Colors.Transparent,
    fontSize: 10,
    color: Colors.Text
  }
});
