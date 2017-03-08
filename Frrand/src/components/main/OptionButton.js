import React, {
  Component
} from 'react';
import {
  StyleSheet, TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';

// components
import OutlinedButton from '../common/OutlinedButton';

export default class OptionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      text: this.props.text
    };

    // bindings
    this.isSelected = this.isSelected.bind(this);
    this.select = this.select.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  isSelected() {
    return this.props.selected == true || this.state.selected == true;
  }

  select(state) {
    this.setState({
      selected: state == null ? !this.state.selected : state
    });
  }

  changeText(text) {
    this.setState({
      text: text
    });
  }

  render() {
    return (
      <TouchableOpacity
        hitSlop={{
          top: Sizes.InnerFrame / 2,
          bottom: Sizes.InnerFrame / 2,
          left: Sizes.InnerFrame / 2,
          right: Sizes.InnerFrame / 2
        }}
        onPress={() => {

          // select toggle and call outer
          this.select();
          this.props.onPress && this.props.onPress();
        }}>
        <OutlinedButton
          highlight={
            (
              this.props.selected
              || !this.props.disableToggle
              && this.isSelected()
            ) && Colors.Text
          }
          highlightFont={
            (
              this.props.selected
              || !this.props.disableToggle
              && this.isSelected()
            ) && Colors.Primary
          }
          text={this.state.text || this.props.text}
          style={styles.container} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: Sizes.InnerFrame / 2
  }
});
