import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem, List } from 'react-native-elements';
import {
  TextInput,
  Divider,
  Provider as PaperProvider,
} from 'react-native-paper';

class AddBillView extends Component {
  _keyExtractor = (item, index) => item.id;

  _renderItem = bill => {
    const { navigation } = this.props;
    const friend = navigation.state.params.friend;

    if (bill.item.payerId === friend.id) {
      return (
        <View
          style={{
            height: 50,
            width: 360,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>{bill.item.billDescription}</Text>
          <Text style={{ color: 'red' }}>
            You borrowed:   
            {(bill.item.amountPaid / bill.item.billParticipants.length).toFixed(
              2
            )}
          </Text>
        </View>
      );
    } else if (bill.item.payerId === '0') {
      let isParticicpant = false;
      for (let i = 0; i < bill.item.billParticipants.length; i++) {
        if (bill.item.billParticipants[i].id === friend.id) {
          isParticicpant = true;
        }
      }

      if (isParticicpant) {
        return (
          <View
            style={{
              height: 50,
              width: 360,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text>{bill.item.billDescription}</Text>
            <Text style={{ color: 'green' }}>
              You lent:  
              {(
                bill.item.amountPaid / bill.item.billParticipants.length
              ).toFixed(2)}
            </Text>
          </View>
        );
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const bills = navigation.state.params.bills;
    const friend = navigation.state.params.friend;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          ListEmptyComponent={NoHistory}
          ItemSeparatorComponent={Divider}
          data={bills}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

class NoHistory extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>You don't have any bills with this friend yet</Text>
      </View>
    );
  }
}

export default AddBillView;
