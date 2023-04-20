import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
  Alert,
  Animated,
} from 'react-native';

import { useState } from 'react';

import Constants from 'expo-constants';
// display a navigation bar at the top of the screen.
import { Header } from 'react-native-elements';
export function ContactPage() {
  // Define state variables for name, email, subject, message, showModal, and errorMessage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      delay: 50,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const handleSend = () => {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      subject.trim() === '' ||
      message.trim() === ''
    ) {
      // If any of the required fields are empty, show an error message
      setErrorMessage('Please fill in all the required fields.');
    } else {
      // Otherwise, show an Alert before sending the message
      Alert.alert(
        'Confirm Send',
        'Are you sure you want to send this message?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Send',
            onPress: () => {
              // Send the message
              const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
              setShowModal(true);
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              setErrorMessage('');
            },
            style: 'destructive',
          },
        ]
      );
    }
  };

  return (
    // Define the main container view
    <View style={styles.container}>
      {/* Define the modal that will show when the message is sent */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Message sent successfully!</Text>
            <Button
              title="OK"
              onPress={() => setShowModal(false)}
              color="#ff7c60"
            />
          </View>
        </View>
      </Modal>

      {/* Define the header text */}
      <Header
        centerComponent={{
          text: 'Contact Us',
          style: { color: '#fff', fontSize: 20, marginTop: 1 },
        }}
        backgroundColor="#ff7c60"
        statusBarProps={{ backgroundColor: '#ff7c60' }}
      />

      {/* Define the contact text */}
      <Text style={styles.contactText}>
        You can contact us at support@tastefinder.com for any feedback or
        concerns.
      </Text>

      {/* Define the scroll view for the form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Show the error message if there is one */}
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {/* Define the input fields */}
          <TextInput
            placeholder="Name"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Subject"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor="black"
            style={[
              styles.input,
              styles.messageInput,
              { backgroundColor: '#c8e6c9' },
            ]}
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />

          <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={handleSend}>
              <Text style={styles.textStyle}>Send Message</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  sendButton: {
    backgroundColor: '#ff7c60',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    marginTop: 5,
    marginLeft: 12,
  },
  input: {
    borderColor: 'silver',
    borderRadius: 15,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputMulti: {
    borderColor: 'silver',
    textAlignVertical: 'top',
    borderRadius: 15,
    height: 90,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputMultiFocused: {
    borderColor: '#FF7C60',
    borderRadius: 15,
    height: 90,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputFocused: {
    borderRadius: 15,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF7C60',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 12,
    borderRadius: 20,
    padding: 13,
    elevation: 2,
    backgroundColor: '#FF7C60',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
