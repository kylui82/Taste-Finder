import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
// import * as data from './food.json';
// import { Login } from './Login';
import {food_array} from "./server/app";

function MainPage({ navigation }) {
  console.log(food_array)
  const [searchValue, setSearchValue] = useState('');
  // {paramkey: searchValue} pass the serch avlue to the next page
  //Please display the top 10 food based on the count
  const [topFoods, setTopFoods] = useState([]);
  useEffect(() => {
    // Sort the food items by descending count and get the top 10
    const sortedFoods = [...food_array].sort((a, b) => b.count - a.count);
    const top10Foods = sortedFoods.slice(0, 10);
    setTopFoods(top10Foods);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textBox, { flex: 1 }]}
          placeholder="Enter Food Name"
          onChangeText={(text) => setSearchValue(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="search"
            onPress={() => {
              navigation.navigate('Result', { paramkey: searchValue });
            }}
          />
        </View>
      </View>
      <FlatList
        data={topFoods}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('Food', { paramkey: item._id });
            }}>
            <View style={styles.itemRankingContainer}>
              <Text style={styles.itemRanking}>Top {index + 1}:</Text>
            </View>
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>{item.food_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

function Result({ navigation, route }) {
  const [hover, setHover] = useState();

  // The way to get data
  console.log(data.food[0].reviews[0]['rating']);
  // console.log(data.food[0].food_name);

  // The way to get search value from the previous page
  let findvalue = route.params.paramkey;
  let food = food_array.filter((d) =>
    d.food_name.toLowerCase().includes(findvalue.toLowerCase())
  );
  console.log(food);

  return (
    <View style={styles.containerResult}>
      <Text style={styles.searchTextResult}>
        Searched for "{route.params.paramkey}"
      </Text>
      {food.length == 0 ? (
        <Text style={styles.noResultText}>No results found</Text>
      ) : (
        <Text style={styles.resultText}>Here are the search results</Text>
      )}
      <FlatList
        data={food}
        renderItem={({ item }) => (
          <View style={styles.itemsResult}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Food', { paramkey: item._id });
              }}
              underlayColor="#dddddd" // add the underlay color
              onShowUnderlay={() => {
                setHover(true);
              }}
              onHideUnderlay={() => {
                setHover(false);
              }}>
              <View
                style={
                  hover
                    ? styles.foodNameContainerHover
                    : styles.foodNameContainer
                }>
                <Text
                  style={
                    hover
                      ? styles.foodNameTextResultHover
                      : styles.foodNameTextResult
                  }>
                  {item.food_name}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.reviewsContainerResult}>
              {/* Add code to display reviews here */}
            </View>
          </View>
        )}
      />
      {food.length == 0 ? (
        <Text style={styles.searchAgainText}>
          Please search for another food
        </Text>
      ) : (
        <Text style={styles.detailsText}>
          Click on a food item to see details
        </Text>
      )}
    </View>
  );
}

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to our Taste Finder!</Text>
      <Button
        title="Main Page"
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
      <Button
        title="About Us"
        onPress={() => {
          navigation.navigate('About');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
        title="Contact"
        onPress={() => {
          navigation.navigate('Contact');
        }}
      />
    </View>
  );
}

function AboutPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>About Us</Text>
      <Text style={styles.aboutText}>
        We are a team of developers who created this app to help people find
        their favourite foods.The Taste Finder App is the best way to find your
        favorite food. Our app allows you to search for food by name, and
        provides detailed information about each food item, including reviews
        from other users.
      </Text>
    </View>
  );
}

function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {};

  const handleRegister = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isRegistering ? handleRegister : handleLogin}>
        <Text style={styles.buttonText}>
          {isRegistering ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'yellow' }]}
        onPress={() => navigation.navigate('Main')}>
         <Text style={[styles.buttonText, { color: 'black' }]}>
            Continue as a guest
          </Text>
      </TouchableOpacity>

  

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    // Send email using a service like Mailgun or SendGrid
    alert(`Message sent:\n${body}`);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contact Us</Text>
      <Text style={styles.contactText}>
        You can contact us at support@tastefinder.com for any feedback or
        queries.
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Subject"
            style={styles.input}
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            placeholder="Message"
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function DishPage({ navigation, route }) {
  const specificFood = data.food.find((f) => f._id === route.params.paramkey);
  if (!specificFood) {
    return <Text style={styles.noFoodText}>No food item found</Text>;
  }

  specificFood.count += 1; // Increase the count for the food by 1

  const averageRating =
    specificFood.reviews.reduce((sum, review) => sum + review.rating, 0) /
    specificFood.reviews.length;

  const numFullStars = Math.floor(averageRating);
  const decimal = averageRating - numFullStars;

  let starRating = '⭐️'.repeat(numFullStars);

  if (decimal === 0.5) {
    starRating += '⭐️½';
  } else if (decimal > 0 && decimal < 0.5) {
    starRating += '⭐️';
  }

  starRating += '☆️'.repeat(5 - numFullStars - (decimal >= 0.5 ? 1 : 0));
  starRating += `\n(${averageRating.toFixed(1)} out of 5)`;

  return (
    <View style={styles.dishPage}>
      <Text style={styles.foodNameText}>{specificFood.food_name}</Text>
      {specificFood.reviews.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.restaurantNameText}>
            Restraunt: {review.restaurant_name}
          </Text>
          <Text style={styles.ratingText}>{starRating}</Text>
          <Text style={styles.addressText}>
            Address: {review.restaurant_address}
          </Text>
          <Text style={styles.descriptionText}>
            Description: {review.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const option = {
    headerStyle: { backgroundColor: 'lightpink' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={option}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="About" component={AboutPage} />
            <Stack.Screen name="Contact" component={ContactPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Main" component={MainPage} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Food" component={DishPage} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  sendButton: {
    backgroundColor: 'lightpink',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginHorizontal: 20,
  },
  contactText: {
    fontSize: 18,
    marginHorizontal: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  dishPage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  foodNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  restaurantNameText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressText: {
    marginBottom: 5,
  },
  ratingText: {
    marginBottom: 5,
  },
  descriptionText: {
    fontStyle: 'italic',
  },
  noFoodText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textBox: {
    color: 'gray',
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'lightgreen',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemNameContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  itemRankingContainer: {
    width: 60,
    alignItems: 'center',
  },
  itemRanking: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  containerResult: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchTextResult: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noResultText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemsResult: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  foodNameContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  foodNameTextResult: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodNameContainerHover: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  foodNameTextResultHover: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  reviewsContainerResult: {
    marginTop: 5,
  },
  searchAgainText: {
    marginTop: 10,
    color: '#999',
  },
  detailsText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleText: {
    color: '#007aff',
    marginTop: 20,
  },
});
