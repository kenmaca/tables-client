import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, TouchableWithoutFeedback
} from 'react-native';
import {
  Sizes, Colors
} from '../../Const';
import Firebase from '../../utils/Firebase';
import DateFormat from 'dateformat';
import * as Animatable from 'react-native-animatable';
import {
  Actions
} from 'react-native-router-flux';

// components
import CircularImage from '../common/CircularImage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Stars from '../common/Stars';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // bindings
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.fbRef = Firebase.database().ref(`restaurants/${this.props.id}`);
    this.listener = this.fbRef.on(
      'value', data => data.exists() && this.setState(data.val())
    );

    // refresh this view every minute
    this.update();
  }

  componentWillUnmount() {
    this.fbRef && this.fbRef.off('value', this.listener);
    this.timer && clearTimeout(this.timer);
  }

  update() {
    this.timer && clearTimeout(this.timer);
    this.setState({});
    this.timer = setInterval(this.update, 60000);
  }

  componentWillReceiveProps(props) {

    // remove old listener and add new one
    this.componentWillUnmount();
    this.props = props;
    this.componentDidMount();
  }

  render() {

    // only present if there are seats available and within period
    return (
      (
        this.state.name
        && (parseInt(this.state.seatsAvailable) > 0)
        && (this.state.availableUntil > Date.now())
      ) ? (
        <TouchableWithoutFeedback
          onPress={() => Actions.web({
            uri: this.state.url
          })}>
          <Animatable.View
            animation='zoomIn'
            duration={200}
            style={styles.container}>
            <View style={styles.content}>
              <View style={styles.body}>
                <View style={styles.header}>
                  <Text style={styles.title}>
                    {this.state.name || 'Unnamed'}
                    <Text style={styles.location}>
                      {
                        ` · ${
                          (
                            this.props.distance
                            && (
                              this.props.distance >= 1
                              ? `${this.props.distance.toFixed(1)} km`
                              : `${(this.props.distance * 1000).toFixed(0)} m`
                            )
                          ) || this.state.location.address1
                          || 'Nearby'}`
                      }
                    </Text>
                  </Text>
                  <Text style={styles.location}>
                    {
                      this.state.categories
                      && (
                        this.state.categories.map(
                          category => category.title
                        ).join(', ')
                      ) || ''
                    }
                  </Text>
                </View>
                <CircularImage
                  size={30}
                  uri={this.state.image_url} />
              </View>
              <View style={styles.footer}>
                <Text style={styles.validUntil}>
                  {
                    `${this.state.seatsAvailable || 0} seats until ${
                      DateFormat(
                        new Date(
                          (
                            this.state.lastCalled
                            || Date.now()
                          ) + (15 * 60 * 1000)
                        ),
                        'h:MM TT'
                      )
                    }`
                  }
                </Text>
                <Stars rating={this.state.rating || 0} />
              </View>
            </View>
          </Animatable.View>
        </TouchableWithoutFeedback>
      ) : (
        <View />
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Sizes.InnerFrame / 2,
    padding: Sizes.InnerFrame,
    borderRadius: Sizes.RoundedBorders,
    backgroundColor: Colors.Foreground
  },

  content: {
    flex: 1
  },

  body: {
    flexDirection: 'row'
  },

  header: {
    flex: 1
  },

  footer: {
    marginTop: Sizes.InnerFrame,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  title: {
    fontSize: Sizes.H3,
    fontWeight: Sizes.Bold
  },

  location: {
    fontSize: Sizes.Text,
    fontWeight: Sizes.Light
  },

  validUntil: {
    fontSize: Sizes.Text,
    fontWeight: Sizes.Bold,
    color: Colors.ModalBackground
  },

  rating: {
    flexDirection: 'row'
  }
});
