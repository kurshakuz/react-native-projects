import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
  } from 'react-native';
import React from 'react';
import {
  TextInput,
  Divider,
  Provider as PaperProvider,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
    
class RecipeView extends React.Component {
  keyExtractor = (item) => item.id;

  render() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', null);
 
    return (
      <ScrollView style={{ flex: 1 }}>

        <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
          <Text  style={{ fontSize: 20, fontWeight:'bold'}} >{recipe.title}</Text> 
        </View>

        <View style={{ flex: 3, alignItems: 'center', margin: 10}} >
          <Image
            style ={{width: 320, height: 240}}
            source={{
              uri: recipe.file.url,
            }}
          />
        </View>

        <View  style={{ flex: 3, margin: 5 }}>
          <Text style={{ fontSize: 15, fontWeight:'bold'}} >Описание: </Text>
          <Text>{recipe.description}</Text>
        </View>
        
        <View style={{ flex: 4, margin: 5 }}>
          <Text style={{ fontSize: 15, fontWeight:'bold'}}>Ингредиенты: </Text>
          <FlatList 
            ItemSeparatorComponent={Divider}
            keyExtractor={this.keyExtractor}
            data={recipe.ingredients}
            renderItem={ ({item}) => (<Text>{item}</Text>)}
          />
        </View>

        <View  style={{ flex: 4, margin: 5 }}>
          <Text style={{ fontSize: 15, fontWeight:'bold'}}>Инструкции: </Text>
          <FlatList 
            ItemSeparatorComponent={Divider}
            keyExtractor={this.keyExtractor}
            data={recipe.instructions}
            renderItem={ ({item}) => (<Text>{item}</Text>)}
          />
        </View>
      </ScrollView>
    );
  }
}
  
export default RecipeView;