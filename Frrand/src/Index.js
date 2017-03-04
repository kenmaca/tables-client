import React, {
  Component
} from 'react';
import {
  View, StyleSheet
} from 'react-native';
import {
  Router, Scene, Actions
} from 'react-native-router-flux';
import {
  Colors
} from './Const';

// views
import Main from './views/Main';
import More from './views/More';
import Web from './views/Web';
import Option from './views/Option';

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene
            hideNavBar
            key='root'>
              <Scene
                initial
                key='main'
                component={Main}
                type='replace' />
              <Scene
                key='more'
                component={More}
                type='replace' />
              <Scene
                key='web'
                component={Web} />
              <Scene
                direction='vertical'
                key='option'
                component={Option} />
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  }
});
