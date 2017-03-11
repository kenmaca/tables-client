import React, {
  Component
} from 'react';
import {
  View
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';

// components
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

// animatable
let AnimatableIcon = Animatable.createAnimatableComponent(MaterialIcon);

export default class AnimatedLoader extends Component {
  render() {
    return (
      <AnimatableIcon
        ref='first'
        name='phone'
        animation='flash'
        iterationCount='infinite'
        color={this.props.color || Colors.Text}
        size={this.props.size || 30} />
    );
  }
}
