import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export function AboutPage({navigation}) {
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

const styles = StyleSheet.create({
  
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})

