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

    this.state = {
      text: this.props.text,
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <InstaImage />
        
        <View style={{ width: 320 }}>
          <Text style={styles.paragraph}>Введите логин для поиска: </Text>
          <TextInput
            label="ex: abilkassov"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />

          <Button
            raised
            primary="true"
            onPress={() =>
              this.props.navigation.navigate('Account', {
                login: this.state.text,
              })
            }>
            Поиск!
          </Button>
        </View>
      </View>
    );
  }
}

class InstaImage extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={{ width: 100, height: 100, marginTop: 30 }}
          source={{
            uri: 'https://png.icons8.com/ios/1600/instagram-new.png',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
