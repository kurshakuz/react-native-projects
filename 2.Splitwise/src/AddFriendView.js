import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { ListItem, List } from 'react-native-elements';

class AddFriendView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriend: {
        id: new Date().getTime().toString(),
        name: '',
        friendsBalance: 0,
      },
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          behavior="padding"
          enabled>
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Type name here!"
            onChangeText={text =>
              this.setState({
                newFriend: {
                  ...this.state.newFriend,
                  name: text,
                },
              })
            }
          />

          <Button
            title="Add Friend!"
            color="#f4511e"
            disabled={!(this.state.newFriend.name)}
            onPress={() => (
              this.props.navigation.state.params.addNewFriend(
                this.state.newFriend
              ),
              this.props.navigation.goBack()
            )}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default AddFriendView;
