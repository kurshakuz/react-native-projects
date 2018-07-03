import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import {
  TextInput,
  Divider,
  Provider as PaperProvider,
} from 'react-native-paper';

import Balance from './Balance';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveFriends: true,
      bills: [],
      friends: [
        {
          id: '1',
          name: 'Ardak',
          friendsBalance: 0,
        },
        {
          id: '2',
          name: 'Almira',
          friendsBalance: 0,
        },
        {
          id: '3',
          name: 'Oshak Lyailevich',
          friendsBalance: 0,
        },
      ],
    };
  }

  handleAddNewFriend = newFriend => {
    this.setState({
      friends: [...this.state.friends, newFriend],
    });
  };

  handleAddNewBill = (bills, newBill) => {
    this.setState({
      bills: [...this.state.bills, newBill],
    });

    // console.log(newBill);

    const amountToPay = newBill.amountPaid / newBill.billParticipants.length;

    if (newBill.payerId === '0') {
      for (let i = 0; i < newBill.billParticipants.length; i++) {
        this.setState(prevState => ({
          friends: prevState.friends.map(friend => {
            if (friend.id === newBill.billParticipants[i].id) {
              return {
                ...friend,
                friendsBalance: friend.friendsBalance + amountToPay,
              };
            }
            return friend;
          }),
        }));
      }
    } else {
      this.setState(prevState => ({
        friends: prevState.friends.map(friend => {
          if (friend.id === newBill.payerId) {
            return {
              ...friend,
              friendsBalance: friend.friendsBalance - amountToPay,
            };
          }
          return friend;
        }),
      }));
    }
  };

  handleOnPressButtonAddFriends = () => {
    this.props.navigation.navigate('AddFriend', {
      addNewFriend: this.handleAddNewFriend,
    });
  };

  handleOnPressButtonAddBill = () => {
    this.props.navigation.navigate('AddBill', {
      bills: this.state.bills,
      friends: this.state.friends,
      addNewBill: this.handleAddNewBill,
    });
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = friend => {
    this.props.navigation.navigate('ViewFriend', {
      friend: friend,
      bills: this.state.bills,
    });
  };

  _renderItem = ({ item }) => (
    <FriendItem
      item={item}
      onPressItem={() => this._onPressItem(item)}
      bills={this.state.bills}
    />
  );

  render() {
    const { navigation } = this.props;
    const friendName = navigation.getParam('friendName', null);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Balance bills={this.state.bills} />
        </View>

        <View style={{ flex: 5 }}>
          <FlatList
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={NoFriends}
            data={this.state.friends}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Button
            onPress={this.handleOnPressButtonAddFriends}
            color="#f4511e"
            title="+ ADD FRIENDS ON SPLITWISE"
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              this.handleOnPressButtonAddBill();
            }}>
            <Image
              style={{ width: 55, height: 55, marginLeft: 290 }}
              source={{
                uri:
                  'https://emojipedia-us.s3.amazonaws.com/thumbs/160/google/6/heavy-plus-sign_2795.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class FriendItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View
          style={{
            height: 50,
            width: 360,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ width: 150 }}>{this.props.item.name}</Text>

          <Text style={{ width: 80 }}>
            {this.props.item.friendsBalance === 0 ? (
              'no expenses'
            ) : this.props.item.friendsBalance >= 0 ? (
              <Text> you are owed {this.props.item.friendsBalance} </Text>
            ) : (
              <Text> you owe {this.props.item.friendsBalance}</Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class NoFriends extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>You have not added any friends yet</Text>
      </View>
    );
  }
}

export default HomeView;
