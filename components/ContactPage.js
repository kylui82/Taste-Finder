import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet
  } from 'react-native';
  import Constants from 'expo-constants';
  import { useState, useEffect } from 'react';
  
  export function ContactPage() {
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
  
  const styles = StyleSheet.create({
      container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    }, headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    contactText: {
      fontSize: 18,
      marginHorizontal: 20,
    },
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
  
  })
  