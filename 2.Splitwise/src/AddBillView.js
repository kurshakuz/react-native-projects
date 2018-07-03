import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { ListItem, List } from 'react-native-elements';
import {
  TextInput,
  Divider,
  Provider as PaperProvider,
} from 'react-native-paper';

class InvolvedFriendsItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View
          style={{
            height: 50,
            width: 360,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: textColor }}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class AddBillView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      amountPaid: 0,
      billDescription: '',
      billParticipants: [{ id: '0', name: 'You' }],
      payerId: '',
    };
  }

  _keyExtractor = (item, index) => item.id;

  _onPressPayer = item => {
    this.setState({
      payerId: item.id,
    });
  };

  _onPressItem = item => {
    this.setState(state => {
      if (!state.selected[item.id]) {
        return {
          selected: {
            ...state.selected,
            [item.id]: !state.selected[item.id],
          },
          billParticipants: [...state.billParticipants, item],
        };
      } else {
        return {
          selected: {
            ...state.selected,
            [item.id]: !state.selected[item.id],
          },
          billParticipants: state.billParticipants.filter(
            participant => participant.id !== item.id
          ),
        };
      }
    });
  };

  _renderItem = ({ item }) => (
    <InvolvedFriendsItem
      onPressItem={this._onPressItem}
      selected={!!this.state.selected[item.id]}
      item={item}
    />
  );

  render() {
    const { navigation } = this.props;
    const friends = navigation.getParam('friends', null);

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        keyboardVerticalOffset={64}
        behavior="position"
        enabled>
        <View style={{ flex: 3 }}>
          <FlatList
            ListHeaderComponent={
              <Text style={{ color: '#696969' }}>Involved friends</Text>
            }
            ItemSeparatorComponent={Divider}
            data={friends}
            extradata={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>

        <View style={{ flex: 3 }}>
          <FlatList
            ListHeaderComponent={
              <Text style={{ color: '#696969' }}>Who paid?</Text>
            }
            ItemSeparatorComponent={Divider}
            keyExtractor={this._keyExtractor}
            extraData={this.state.selected}
            data={this.state.billParticipants}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._onPressPayer(item)}>
                <View
                  style={{
                    height: 50,
                    width: 360,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: this.state.payerId === item.id ? 'red' : 'black',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40, width: 300 }}
            keyboardType="numeric"
            placeholder="Type amount paid here!"
            onChangeText={text =>
              this.setState({
                amountPaid: text,
              })
            }
          />
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Type description here!"
            onChangeText={text =>
              this.setState({
                billDescription: text,
              })
            }
          />
        </View>

        <View style={{ flex: 1 }}>
          <Button
            style={{ padding: 20 }}
            title="Add a bill!"
            color="#f4511e"
            disabled={
              !(
                this.state.payerId &&
                this.state.amountPaid &&
                this.state.billDescription
              )
            }
            onPress={() => (
              this.props.navigation.state.params.addNewBill(
                this.props.navigation.state.params.bills,
                {
                  payerId: this.state.payerId,
                  billParticipants: this.state.billParticipants,
                  amountPaid: this.state.amountPaid,
                  billDescription: this.state.billDescription,
                }
              ),
              this.props.navigation.goBack()
            )}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AddBillView;
