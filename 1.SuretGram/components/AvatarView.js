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

export default class AvatarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }

  renderAvatar = () => {
    const { navigation } = this.props;
    const url = navigation.getParam('picUrl', null);
    
    return (
      <Image
        style={{ width: 350, height: 350 }}
        source={{
          uri: url.toString(),
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        {this.renderAvatar()}
      </View>
    );
  }
}
