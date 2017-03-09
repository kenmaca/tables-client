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
    this.notifyMain = this.notifyMain.bind(this);
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

  notifyMain() {
    this.props.onChange && this.props.onChange(this.getOptions());
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
                onPress={() => {
                  Object.values(this.refs).forEach(
                    button => button.select(false)
                  );

                  // alert parent
                  this.notifyMain();
                }}
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

              // alert parent
              this.notifyMain();
            }}
            text='Price' />
          <OptionButton
            onPress={this.notifyMain}
            ref='hotdogs'
            text='Fast Food' />
          <OptionButton
            onPress={this.notifyMain}
            ref='breakfast_brunch'
            text='Breakfast & Brunch' />
          <OptionButton
            onPress={this.notifyMain}
            ref='comfortfood'
            text='Comfort Food' />
          <OptionButton
            onPress={this.notifyMain}
            ref='desserts'
            text='Desserts' />
          <OptionButton
            onPress={this.notifyMain}
            ref='cafes'
            text='Cafe' />
          <OptionButton
            onPress={this.notifyMain}
            ref='seafood'
            text='Seafood' />
          <OptionButton
            onPress={this.notifyMain}
            ref='italian'
            text='Italian' />
          <OptionButton
            onPress={this.notifyMain}
            ref='indpak'
            text='Indian' />
          <OptionButton
            onPress={this.notifyMain}
            ref='bars'
            text='Bars' />
          <OptionButton
            onPress={this.notifyMain}
            ref='japanese'
            text='Japanese' />
          <OptionButton
            onPress={this.notifyMain}
            ref='chinese'
            text='Chinese' />
          <OptionButton
            onPress={this.notifyMain}
            ref='mexican'
            text='Mexican' />
          <OptionButton
            onPress={this.notifyMain}
            ref='vegetarian'
            text='Vegetarian' />
          <OptionButton
            onPress={this.notifyMain}
            ref='halal'
            text='Halal' />
          <OptionButton
            onPress={this.notifyMain}
            ref='vietnamese'
            text='Vietnamese' />
          <OptionButton
            onPress={this.notifyMain}
            ref='thai'
            text='Thai' />
          <OptionButton
            onPress={this.notifyMain}
            ref='steak'
            text='Steak' />
          <OptionButton
            onPress={this.notifyMain}
            ref='canadian'
            text='Canadian' />
          <OptionButton
            onPress={this.notifyMain}
            ref='caribbean'
            text='Caribbean' />
          <OptionButton
            onPress={this.notifyMain}
            ref='korean'
            text='Korean' />
          <OptionButton
            onPress={this.notifyMain}
            ref='greek'
            text='Greek' />
          <OptionButton
            onPress={this.notifyMain}
            ref='bakeries'
            text='Bakeries' />
          <OptionButton
            onPress={this.notifyMain}
            ref='pizza'
            text='Pizza' />
          <OptionButton
            onPress={this.notifyMain}
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
