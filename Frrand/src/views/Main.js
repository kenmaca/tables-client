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
import {
  callMore
} from './More';

// components
import * as Animatable from 'react-native-animatable';
import ParallaxView from 'react-native-parallax-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/main/Header';
import Options from '../components/main/Options';
import AvailableList from '../components/restaurants/AvailableList';
import AnimatedLoader from '../components/common/AnimatedLoader';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true
    };
  }

  componentDidMount() {

    // toggle loader on initial load
    this.refs.available.update();
  }

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
            <AvailableList
              ref='available'
              callMore={callMore}
              onChange={visible => this.setState({
                showLoader: visible.length <= 0
              })}
              getOptions={
                () => this.refs.options && this.refs.options.getOptions()
              } />
            <View style={styles.footer}>
              <View style={styles.separator} />
              <View style={styles.logo}>
                {
                  this.state.showLoader
                  ? (
                    <AnimatedLoader color={Colors.LightestText} />
                  ): (
                    <MaterialIcon
                      name='restaurant'
                      color={Colors.LightestText}
                      size={30} />
                  )
                }
              </View>
              <Text style={styles.moreText}>
                Restaurants will show up automatically above as soon
                as they confirm availability
              </Text>
            </View>
          </ParallaxView>
          <Options
            ref='options'
            onChange={
              () => {

                // send out new Task and update available list
                callMore(this.refs.options.getOptions());
                this.refs.available && this.refs.available.update();
              }
            } />
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
    textAlign: 'center',
    marginBottom: Sizes.OuterFrame,
    paddingLeft: Sizes.OuterFrame * 2,
    paddingRight: Sizes.OuterFrame * 2,
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
