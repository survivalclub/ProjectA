import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS,
  ActivityIndicator,
} from 'react-native';
import { NavigationActions } from 'react-navigation';


class DisappearanciesView extends Component {
  static propTypes = {
      //navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      error: "",
      showProgress: false,
    };
    this.dataRecords = [];
  }

  componentWillMount() {
    this.getList();
    console.log(this.dataRecords);
  }

  getList(params) {
    this.setState({showProgress: true})
    fetch("http://localhost:3001/api/records", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      if(response.status==200) {
        response.json()
        .then((responseData) => {
          this.dataRecords = responseData;
          this.setState({showProgress: false});
        })
      } else {
        console.log('Uncknown Response: ',response.status);
      }
    })
    .done();
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.content}>

            <View style={styles.row}>
              {this.dataRecords.map(function(object, i){
                return (
                  <View key={i}>
                    <Image
                      source={{uri: 'https://images.unsplash.com/photo-1476036896437-6a24b25e6e50', cache: 'default'}}
                      style={styles.imageitem}
                    />
                    <Text style={styles.label}>{object.full_name}</Text>
                  </View>
                );
              })}
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
    //width: 250,
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
  error: {
    color: 'red',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
  },
  loader: {
    marginTop: 20
  },
  imageitem: {
    width: 200,
    height: 200,
    resizeMode: 'cover',  // 'cover', 'contain', 'stretch', 'repeat', 'center'
    //backgroundColor: 'rgba(240, 240, 240, 1.0)',
    opacity: 1.0,
    //borderColor: '#ff0000',
    borderWidth: 0,
    borderRadius: 0,
  },


});


export default DisappearanciesView
