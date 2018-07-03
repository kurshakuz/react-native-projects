import React, { Component } from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import {
  Button,
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import GridView from 'react-native-gridview';

import HomeView from './components/HomeView';
import AccountView from './components/AccountView';
import AvatarView from './components/AvatarView';
import DetailsView from './components/DetailsView';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Suretgram',
  };
  render() {
    return (
      <HomeView navigation={this.props.navigation} />
    );
  }
}

class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.login}`,
  });

  render() {
    return <AccountView navigation={this.props.navigation}/>
  }
}

class AvatarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Avatar',
  });
  
  render() {
    return <AvatarView navigation={this.props.navigation}/>;
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
  });
  
  render() {
    return <DetailsView navigation={this.props.navigation}/>;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Account: AccountScreen,
    Avatar: AvatarScreen,
    Details: DetailsScreen,
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
