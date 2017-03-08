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
    this.state = {
      showClearButton: false
    };

    // bindings
    this.nextPriceText = this.nextPriceText.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  nextPriceText(text) {
    return (PRICE_LEVELS)[text]
  }

  getOptions() {
    let options = Object.keys(this.refs).filter(
      option => this.refs[option].isSelected()
    ).filter(
      option => option !== 'price'
    ).map(
      option => this.refs[option].state.text
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
          {
            this.state.showClearButton && (
              <OptionButton
                disableToggle
                selected
                onPress={() => Object.values(this.refs).forEach(
                  button => button.select(false)
                )}
                text='Clear' />
            )
          }
          <OptionButton
            ref='price'
            onPress={() => {
              let nextPrice = this.nextPriceText(this.refs.price.state.text);
              this.refs.price.changeText(nextPrice);
              if (nextPrice === 'Price') {
                this.refs.price.select(false);
              } else {
                this.refs.price.select(true);
              }
            }}
            text='Price' />
          <OptionButton
            ref='fast_food'
            text='Fast Food' />
          <OptionButton
            ref='breakfast'
            text='Breakfast' />
          <OptionButton
            ref='pub'
            text='Pub' />
          <OptionButton
            ref='desserts'
            text='Desserts' />
          <OptionButton
            ref='cafe'
            text='Cafe' />
          <OptionButton
            ref='seafood'
            text='Seafood' />
          <OptionButton
            ref='italian'
            text='Italian' />
          <OptionButton
            ref='indian'
            text='Indian' />
          <OptionButton
            ref='japanese'
            text='Japanese' />
          <OptionButton
            ref='chinese'
            text='Chinese' />
          <OptionButton
            ref='mexican'
            text='Mexican' />
          <OptionButton
            ref='vegetarian'
            text='Vegetarian' />
          <OptionButton
            ref='halal'
            text='Halal' />
          <OptionButton
            ref='vietnamese'
            text='Vietnamese' />
          <OptionButton
            ref='thai'
            text='Thai' />
          <OptionButton
            ref='steak'
            text='Steak' />
          <OptionButton
            ref='canadian'
            text='Canadian' />
          <OptionButton
            ref='caribbean'
            text='Caribbean' />
          <OptionButton
            ref='korean'
            text='Korean' />
          <OptionButton
            ref='greek'
            text='Greek' />
          <OptionButton
            ref='bakeries'
            text='Bakeries' />
          <OptionButton
            ref='pizza'
            text='Pizza' />
          <OptionButton
            ref='mediterranean'
            text='Mediterranean' />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ModalBackground
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
