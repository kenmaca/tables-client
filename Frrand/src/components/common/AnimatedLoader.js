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
import * as Animatable from 'react-native-animatable';

// animatable
let AnimatableIcon = Animatable.createAnimatableComponent(MaterialIcon);

export default class AnimatedLoader extends Component {
  componentDidMount() {

    // animate loader
    this.flipFirst = this.flipFirst.bind(this);
    this.flipSecond = this.flipSecond.bind(this);
    this.flipFirst();
  }

  flipFirst() {
    this.refs.first.flipInY(500).then(() => {
      this.refs.first.flipOutY(500).then(this.flipSecond).catch(() => {});
    }).catch(() => {});
  }

  flipSecond() {
    this.refs.second.flipInY(500).then(() => {
      this.refs.second.flipOutY(500).then(this.flipFirst).catch(() => {});
    }).catch(() => {});
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatableIcon
          style={[
            styles.icon,
            this.props.size && {
              left: -Math.round(this.props.size / 2),
              top: -Math.round(this.props.size / 2)
            }
          ]}
          ref='first'
          name='restaurant'
          color={this.props.color || Colors.Text}
          size={this.props.size || 30} />
        <AnimatableIcon
          style={[
            styles.icon,
            this.props.size && {
              left: -Math.round(this.props.size / 2),
              top: -Math.round(this.props.size / 2)
            }
          ]}
          ref='second'
          name='phone'
          color={this.props.color || Colors.Text}
          size={this.props.size || 30} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: -15,
    left: -15,
    opacity: 0
  }
});
