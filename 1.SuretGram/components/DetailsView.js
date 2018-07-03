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

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const photoUrl = navigation.getParam('url', null);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: 350, height: 350 }}
          source={{
            uri: photoUrl.toString(),
          }}
        />
      </View>
    );
  }
}
