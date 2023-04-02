import { connect } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button, TextInput, StyleSheet} from "react-native";
import {Add_item} from "../redux/actions/index";
import {useState, useEffect} from "react"
const mapStateToProps = (state)=>{return{items: state.add_reducer.items}}
const mapDispatchToProps = {Add_text}


function MainPage({navigation}) {
  return (
    <View>
      <Text>Taste Finder</Text>
      <Button title="search" onPress={()=>{navigation.navigate("Result")}}/>
    </View>
  );
}
// you can pass props instead without {}
function Result({navigation}) {
  return (
    <View>
      <Text>Result</Text>
    </View>
  );
}

function DishPage(){
  return(
    <View>
      <Text>Refund</Text>
    </View>
  );
}


function App({items, Add_item}){

  const Stack = createStackNavigator();
  const option ={
    headerStyle: { backgroundColor: 'lightpink' },    
    headerTintColor: 'white', 
    headerTitleAlign: "center",    
    headerTitleStyle: { fontWeight: "bold" },
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={option}>
            <Stack.Screen name="Taste Finder" component={MainPage} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Food" component={DishPage} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);