import React, {
  Component
} from 'react';
import {
  StyleSheet, TouchableOpacity, Platform, View
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';
import {
  Actions
} from 'react-native-router-flux';

// components
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

export default class CloseButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[
        styles.container,
        this.props.style
      ]}>
        <TouchableOpacity
          onPress={this.props.action || Actions.pop}>
          <Animatable.View
            animation='zoomIn'
            delay={250}
            duration={300}>
            <MaterialIcon
              name={this.props.back ? 'arrow-back': 'close'}
              color={Colors.Text}
              size={30} />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: Sizes.InnerFrame,
    left: 0,
    padding: Sizes.InnerFrame,
    position: 'absolute'
  }
});
