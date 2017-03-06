import React, {
  Component
} from 'react';
import {
  AppRegistry, View
} from 'react-native';
import codePush from 'react-native-code-push';

// components
import Index from './src/Index';

export default class Frrand extends Component {
  render() {
    return (
      <Index />
    );
  }
}

Frrand = codePush(Frrand);
AppRegistry.registerComponent('Frrand', () => Frrand);
