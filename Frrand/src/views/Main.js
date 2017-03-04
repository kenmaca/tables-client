import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, InteractionManager
} from 'react-native';
import {
  Colors, Sizes
} from '../Const';
import {
  Actions
} from 'react-native-router-flux';

// components
import * as Animatable from 'react-native-animatable';
import ParallaxView from 'react-native-parallax-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/main/Header';
import Options from '../components/main/Options';
import AvailableList from '../components/restaurants/AvailableList';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parallax}>
          <ParallaxView
            header={(
              <Header />
            )}
            windowHeight={300}
            backgroundSource={require('../../res/media/cover.jpg')}
            scrollableViewStyle={styles.content}>
            <AvailableList />
            <View style={styles.footer}>
              <View style={styles.separator} />
              <View style={styles.logo}>
                <MaterialIcon
                  name='restaurant-menu'
                  size={30}
                  color={Colors.LightestText} />
              </View>
              <Text style={styles.moreText}>
                Don't like these options?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.refs.ball.transitionTo({
                    width: Sizes.Height * 4,
                    height: Sizes.Height * 4,
                    borderRadius: Sizes.Height * 2
                  }, 500, 'ease-in');

                  // proceed to more screen
                  InteractionManager.runAfterInteractions(Actions.more);
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  Find more with Frrand
                </Text>
              </TouchableOpacity>
            </View>
          </ParallaxView>
          <Options />
        </View>
        <Animatable.View
          ref='ballContainer'
          style={styles.ballContainer}>
          <Animatable.View
            ref='ball'
            style={styles.ball} />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  parallax: {
    flex: 1
  },

  content: {
    flex: 1,
    backgroundColor: Colors.Transparent
  },

  cards: {
    margin: Sizes.OuterFrame
  },

  footer: {
    alignItems: 'center'
  },

  separator: {
    alignSelf: 'stretch',
    marginBottom: -Sizes.InnerFrame * 1.75,
    borderTopColor: Colors.LightestText,
    borderTopWidth: 0.5,
  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: Colors.Background
  },

  moreText: {
    marginBottom: Sizes.InnerFrame,
    fontSize: Sizes.Text,
    fontWeight: Sizes.Light,
    color: Colors.LightestText
  },

  button: {
    marginBottom: Sizes.OuterFrame,
    backgroundColor: Colors.ModalBackground,
    padding: Sizes.InnerFrame,
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame,
    borderRadius: Sizes.OuterFrame,
  },

  buttonText: {
    fontSize: Sizes.H3,
    fontWeight: Sizes.Light,
    color: Colors.Text
  },

  ballContainer: {
    position: 'absolute',
    bottom: -Sizes.Height * 2,
    width: Sizes.Width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  ball: {
    width: Sizes.Height * 2,
    height: Sizes.Height * 2,
    borderRadius: Sizes.Height,
    backgroundColor: Colors.ModalBackground
  }
});
