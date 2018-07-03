import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {
  Button,
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';

import AddFriendView from './src/AddFriendView';
import HomeView from './src/HomeView';
import AddBillView from './src/AddBillView';
import ViewFriendView from './src/ViewFriendView';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Splitwise',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <HomeView navigation={this.props.navigation} />
    );
  }
}

class AddFriendScreen extends React.Component {
  static navigationOptions = {
    title: 'Add a friend',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <AddFriendView navigation={this.props.navigation} />
    );
  }
}

class AddBillScreen extends React.Component {
  static navigationOptions = {
    title: 'Add a bill',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <AddBillView navigation={this.props.navigation} />
    );
  }
}

class ViewFriendScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.friend.name}`,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  });
  render() {
    return (
      <ViewFriendView navigation={this.props.navigation} />
      );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddFriend: AddFriendScreen,
    AddBill: AddBillScreen,
    ViewFriend: ViewFriendScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <RootStack />
      </PaperProvider>
      );
  }
}