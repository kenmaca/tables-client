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
    this.state = {
      call: {
        processed: false,
        lastAttempted: 0
      },
      renderer: null
    };

    // bindings
    this.update = this.update.bind(this);
    this.getName = this.getName.bind(this);
    this.isAvailable = this.isAvailable.bind(this);
    this.isPending = this.isPending.bind(this);
    this.renderAvailable = this.renderAvailable.bind(this);
    this.renderPending = this.renderPending.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.assignRenderer = this.assignRenderer.bind(this);
  }

  componentDidMount() {

    // restaurant
    this.fbRef = Firebase.database().ref(`restaurants/${this.props.id}`);
    this.listener = this.fbRef.on(
      'value', data => data.exists() && this.setState(
        data.val(), this.assignRenderer
      )
    );

    // call stats (for pending status)
    this.caRef = Firebase.database().ref(`calls/${this.props.id}`);
    this.callListener = this.caRef.on(
      'value', data => data.exists() && this.setState({
        call: data.val()
      }, this.assignRenderer)
    );
  }

  componentWillUnmount() {
    this.fbRef && this.fbRef.off('value', this.listener);
    this.caRef && this.caRef.off('value', this.callListener);
  }

  update() {
    this.setState({});
  }

  getName() {
    return this.props.id;
  }

  componentWillReceiveProps(props) {

    // remove old listener and add new one
    this.componentWillUnmount();
    this.props = props;
    this.componentDidMount();
  }

  isAvailable() {
    return (
      this.state.name
      && (parseInt(this.state.seatsAvailable) > 0)
      && (this.state.availableUntil > Date.now())
    );
  }

  isPending() {
    return (
      this.state.call.processed
      && Date.now() - this.state.call.lastAttempted < 60 * 1000 * 100000
    );
  }

  assignRenderer() {
    let renderer = this.renderEmpty;
    if (!this.props.filter(this.state)) {
      renderer = this.renderEmpty;
    } else if (this.isAvailable()) {
      renderer = this.renderAvailable;
    } else if (this.isPending()) {
      renderer = this.renderPending;
    }

    this.setState({renderer: renderer});
  }

  renderAvailable() {
    return (
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
                      this.state.availableUntil,
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
    );
  }

  renderPending() {
    return (
      <View>
        <Text>
          {`${this.getName()} is pending calling`}
        </Text>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View />
    );
  }

  render() {
    return this.state.renderer ? this.state.renderer() : this.renderEmpty();
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
