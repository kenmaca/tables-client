import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Image, ScrollView
} from 'react-native';
import {
  Colors, Sizes
} from '../../Const';

// components
import OptionButton from './OptionButton';

// consts
PRICE_LEVELS = {
  'Price': '  $  ',
  '  $  ': '  $$  ',
  '  $$  ': ' $$$ ',
  ' $$$ ': ' $$$$ ',
  ' $$$$ ': 'Price'
};

export default class Options extends Component {
  constructor(props) {
    super(props);

    // bindings
    this.priceUpdate = this.priceUpdate.bind(this);
    this.nextPriceText = this.nextPriceText.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  priceUpdate() {
    let nextPrice = this.nextPriceText(this.refs.price.state.text);
    this.refs.price.changeText(nextPrice);

    // toggle visible selected button display
    if (nextPrice === 'Price') {
      this.refs.price.select(false);
    } else {
      this.refs.price.select(true);
    }

    // alert parent
    this.props.onChange();
  }

  nextPriceText(text) {
    return (PRICE_LEVELS)[text]
  }

  getOptions() {
    let options = Object.keys(this.refs).filter(
      option => this.refs[option].isSelected()
    ).filter(
      option => option !== 'price'
    );

    return {
      options: options,
      terms: options.join(' '),
      price: (
        Object.keys(PRICE_LEVELS).indexOf(this.refs['price'].state.text) > 0
        ? Object.keys(PRICE_LEVELS).indexOf(this.refs['price'].state.text)
        : null
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.buttons}>
          <OptionButton
            ref='price'
            onPress={this.priceUpdate}
            text='Price' />
          <OptionButton
            onPress={this.props.onChange}
            ref='hotdogs'
            text='Fast Food' />
          <OptionButton
            onPress={this.props.onChange}
            ref='breakfast_brunch'
            text='Breakfast & Brunch' />
          <OptionButton
            onPress={this.props.onChange}
            ref='comfortfood'
            text='Comfort Food' />
          <OptionButton
            onPress={this.props.onChange}
            ref='desserts'
            text='Desserts' />
          <OptionButton
            onPress={this.props.onChange}
            ref='cafes'
            text='Cafe' />
          <OptionButton
            onPress={this.props.onChange}
            ref='seafood'
            text='Seafood' />
          <OptionButton
            onPress={this.props.onChange}
            ref='italian'
            text='Italian' />
          <OptionButton
            onPress={this.props.onChange}
            ref='indpak'
            text='Indian' />
          <OptionButton
            onPress={this.props.onChange}
            ref='bars'
            text='Bars' />
          <OptionButton
            onPress={this.props.onChange}
            ref='japanese'
            text='Japanese' />
          <OptionButton
            onPress={this.props.onChange}
            ref='chinese'
            text='Chinese' />
          <OptionButton
            onPress={this.props.onChange}
            ref='mexican'
            text='Mexican' />
          <OptionButton
            onPress={this.props.onChange}
            ref='vegetarian'
            text='Vegetarian' />
          <OptionButton
            onPress={this.props.onChange}
            ref='halal'
            text='Halal' />
          <OptionButton
            onPress={this.props.onChange}
            ref='vietnamese'
            text='Vietnamese' />
          <OptionButton
            onPress={this.props.onChange}
            ref='thai'
            text='Thai' />
          <OptionButton
            onPress={this.props.onChange}
            ref='steak'
            text='Steak' />
          <OptionButton
            onPress={this.props.onChange}
            ref='canadian'
            text='Canadian' />
          <OptionButton
            onPress={this.props.onChange}
            ref='caribbean'
            text='Caribbean' />
          <OptionButton
            onPress={this.props.onChange}
            ref='korean'
            text='Korean' />
          <OptionButton
            onPress={this.props.onChange}
            ref='greek'
            text='Greek' />
          <OptionButton
            onPress={this.props.onChange}
            ref='bakeries'
            text='Bakeries' />
          <OptionButton
            onPress={this.props.onChange}
            ref='pizza'
            text='Pizza' />
          <OptionButton
            onPress={this.props.onChange}
            ref='mediterranean'
            text='Mediterranean' />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ToolbarBackground
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row'
  },

  logo: {
    width: 20,
    height: 20
  }
});
