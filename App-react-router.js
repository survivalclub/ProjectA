import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link, DeepLinking } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

import LoginView from './components/LoginView.ios.js';

export default class App extends Component {
  state = {
    navigation: {},
    card: {},
  }

  render() {
    return (
      <NativeRouter>
        <DeepLinking>
          <View style={styles.container}>
            <StatusBar barStyle={this.state.navigation.barStyle} />
            <Navigation
              navBarStyle={this.state.navigation.navBarStyle}
              titleStyle={this.state.navigation.titleStyle}
              backButtonTintColor={this.state.navigation.backButtonTintColor}
            >
              <Card
                exact
                path="/"
                title="Index"
                render={() =>
                  <View style={styles.scene}>
                    <Link component={TouchableOpacity} to="/yolo">
                      <Text>Push a new scene</Text>
                    </Link>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.setState({
                          navigation: {
                            navBarStyle: { backgroundColor: PRIMARY_COLOR },
                            titleStyle: { color: 'white' },
                            barStyle: 'light-content',
                            backButtonTintColor: 'white',
                          },
                        })
                      }}
                    >
                      <Text>Change navbar style</Text>
                    </TouchableOpacity>
                    <LoginView />
                  </View>}
              />
              <Card
                titleStyle={this.state.card.titleStyle}
                navBarStyle={this.state.card.navBarStyle}
                backButtonTintColor={this.state.card.backButtonTintColor}
                path="/yolo"
                render={() =>
                  <View style={styles.scene}>
                    <Link component={TouchableOpacity} to="/hello">
                      <Text>Push tabs</Text>
                    </Link>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.setState(prevState => ({
                          navigation: {
                            ...prevState.navigation,
                            barStyle: 'light-content',
                          },
                          card: {
                            ...prevState.card,
                            navBarStyle: { backgroundColor: SECONDARY_COLOR },
                            titleStyle: { color: 'white' },
                            backButtonTintColor: 'white',
                          },
                        }))
                      }}
                    >
                      <Text>Change navbar style</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.setState(prevState => ({
                          card: {
                            ...prevState.card,
                            title: 'New title !',
                          },
                        }))
                      }}
                    >
                      <Text>Change title</Text>
                    </TouchableOpacity>
                  </View>}
                title={this.state.card.title || 'Yolo'}
              />
              <Card
                path="/hello"
                title="Hello"
                render={({ match, location }) => (
                  console.log(location),
                  (
                    <Switch location={location}>
                      <Route
                        exact
                        path={match.url}
                        render={() => <Redirect to={`${match.url}/one`} />}
                      />
                      <Route
                        render={() =>
                          <Tabs
                            style={styles.container}
                            tabBarStyle={styles.tabs}
                            tabBarIndicatorStyle={styles.indicator}
                          >
                            <Tab
                              path={`${match.url}/one`}
                              label="One"
                              render={() =>
                                <View style={styles.scene}>
                                  <Text>One</Text>
                                </View>}
                            />
                            <Tab
                              path={`${match.url}/two`}
                              label="Two"
                              render={() =>
                                <View style={styles.scene}>
                                  <Text>Two</Text>
                                </View>}
                            />
                            <Tab
                              path={`${match.url}/three`}
                              label="Three"
                              render={() =>
                                <View style={styles.scene}>
                                  <Text>Three</Text>
                                </View>}
                            />
                          </Tabs>}
                      />
                    </Switch>
                  )
                )}
              />
            </Navigation>
          </View>
        </DeepLinking>
      </NativeRouter>
    )
  }
}

const PRIMARY_COLOR = 'rgb(226, 68, 68)'
const SECONDARY_COLOR = 'rgb(226, 144, 68)'
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    padding: 18,
  },
  tabs: {
    backgroundColor: PRIMARY_COLOR,
  },
  indicator: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
  },
})
