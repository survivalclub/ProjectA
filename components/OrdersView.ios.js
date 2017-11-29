import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import { NavigationActions } from 'react-navigation';


var STORAGE_KEY = 'id_token';

class OrdersView extends Component {
  static propTypes = {
      //navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      const setParamsAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      this.props.navigation.dispatch(setParamsAction);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _getProtectedQuote() {
    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('DEMO_TOKEN: ' + DEMO_TOKEN);
    fetch("http://localhost:3001/api/protected/random-quote", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
    .then((response) => response.text())
    .then((quote) => {
      AlertIOS.alert("Chuck Norris Quote:", quote)
      console.log(quote);
    })
    .done();
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Orders
            </Text>
            <View style={styles.row}>
              <TouchableHighlight style={styles.button} onPress={ () => this._getProtectedQuote() }  underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Get a Chuck Norris Quote!</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button} onPress={ () => this._userLogout() } underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  content: {
    width: 250,
  },
  title: {
    fontSize: 28,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});


export default OrdersView
