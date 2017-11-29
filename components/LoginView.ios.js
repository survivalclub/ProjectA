import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  AlertIOS,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import { NavigationActions } from 'react-navigation';


var STORAGE_KEY = 'id_token';

class LoginView extends Component {

  static propTypes = {
    //navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    console.log('constructor');
    super(props, context);
    this.state = {
      username: '',
      password: '',
      error: "",
      showProgress: false,
    };
    this._focusNextField = this._focusNextField.bind(this);
    this.inputs = {};
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.getToken();
  }

  _focusNextField(id) {
    this.inputs[id].focus();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(STORAGE_KEY);
      if(!accessToken) {
          console.log("Token not set");
      } else {
          this.verifyToken(accessToken)
      }
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  async verifyToken(token) {
    fetch("http://localhost:3001/api/protected", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      if(response.status==200) {
        this.redirectNext();
      } else {
        console.log("Token invalid");
      }
      response.text()
      .then((quote) => {
        //console.log(quote);
      })
    })
    .done();
  }

  async storeToken(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  redirectNext() {
    const setParamsAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Orders'})
      ]
    })
    this.props.navigation.dispatch(setParamsAction);
  }

  async _userLogin() {
    this.setState({showProgress: true})
    fetch("http://localhost:3001/sessions/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response)=>{
      if(response.status==201) {
        response.json()
        .then((responseData) => {
          console.log("201: Login successfully ",responseData.id_token);
          this.setState({showProgress: false});
          this.storeToken(STORAGE_KEY, responseData.id_token);
          this.redirectNext();
        })
      } else if(response.status==400) {
        response.json()
        .then((responseData) => {
          this.setState({error: responseData.message});
          console.log("400:", responseData.message);
          this.setState({showProgress: false});
        })
      } else if(response.status==401) {
        response.json()
        .then((responseData) => {
          this.setState({error: responseData.message});
          console.log("400:", responseData.message);
          this.setState({showProgress: false});
        })
      } else {
        //console.log('Uncknown Response: ',response.status);
      }
    })
    .done();
  }

  render() {
    console.log('render');
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Sign In
          </Text>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="email"
              style={styles.input}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={this.state.username}
              returnKeyType={ "next" }
              ref={ input => { this.inputs['email'] = input }}
              onSubmitEditing={() => this._focusNextField('pass')}
              onChange={(event) => this.setState({ username: event.nativeEvent.text })}
             />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              password={true}
              autoCapitalize="none"
              value={this.state.password}
              secureTextEntry={true}
              placeholder="four"
              blurOnSubmit={true}
              returnKeyType={"done"}
              ref={ input => {this.inputs['pass'] = input}}
              onChange={(event) => this.setState({ password: event.nativeEvent.text })}
             />
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={ () => this._userLogin() } underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.link} onPress={ () => this.props.navigation.navigate('Registration') } underlayColor='#99d9f4'>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.link} onPress={ () => this.props.navigation.navigate('Resetpass') } underlayColor='#99d9f4'>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableHighlight>
          </View>

          <Text style={styles.error}>
            {this.state.error}
          </Text>

          <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}
          />

        </View>
      </KeyboardAvoidingView>
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
  field: {
    marginVertical: 5,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 32,
    fontSize: 14,
    padding: 8,
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
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  link: {
    height: 36,
    marginTop: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#48BBEC',
    alignSelf: 'center'
  },
  error: {
    color: 'red',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }

});


export default LoginView
