import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import {
  Button,
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import GridView from 'react-native-gridview';

export default class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      url: '',
      isLoading: true,
      navigation: this.props.navigation,
    };

    this.getData();
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.login}`,
  });

  handleClick = URL => {
    return this.props.navigation.navigate('Details', {
      url: URL,
    });
  };

  getData = () => {
    const { navigation } = this.props;
    const login = navigation.getParam('login', null);

    fetch('https://apinsta.herokuapp.com/u/' + login.toString())
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        this.setState({ data: responseJson, isLoading: false });
      });
  };

  renderPhotos = () => {
    return (
      <GridView
        data={this.state.data.graphql.user.edge_owner_to_timeline_media.edges}
        itemsPerRow={3}
        renderItem={listItem => (
          <TouchableOpacity
            onPress={() => this.handleClick(listItem.node.display_url)}>
            <Image
              style={{ height: 120, width: 120 }}
              source={{ uri: listItem.node.thumbnail_src }}
            />
          </TouchableOpacity>
        )}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.statusText}>
          <Text> is loading... </Text>
        </View>
      );
    }
    if (!this.state.data.graphql) {
      return (
        <View style={styles.statusText}>
          <Text> Сори, такого аккаунта не существует :( </Text>
        </View>
      );
    }
    if (this.state.data.graphql.user.is_private) {
      return (
        <View style={styles.statusText}>
          <Text> Сори, этот аккаунт закрыт :( </Text>
          <Button
            raised
            primary="true"
            onPress={() =>
              this.props.navigation.navigate('Avatar', {
                picUrl: this.state.data.graphql.user.profile_pic_url_hd,
              })
            }>
            пссст, не хочешь глянуть его/ее аву?)
          </Button>
        </View>
      );
    }
    return this.renderPhotos();
  }
}

const styles = StyleSheet.create({
  statusText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
