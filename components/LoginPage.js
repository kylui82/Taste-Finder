import { NavigationContainer } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';


export function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleLogin = () => {
  // handle login logic here
  // call the onLogin prop
  if (email === 'example@mail.com' && password === 'password123') {
    setShowProgress(true);
    setTimeout(() => {
      navigation.navigate('HomePage');
    }, 1500);
    setTimeout(() => {
      setShowProgress(false);
    }, 2000);
  }
};

  const handleRegister = () => {};
 const NavBar = () => {
    return (
      <View style={styles.navBar}>
        <Image source={{uri:'../assets/icons8-rice-bowl-24.png'}} style={{width: 40, height: 40}} />
      </View>
    );
  };

return (
    <View style={styles.container}>
      <NavBar />
    <View style={styles.pageTitleContainer}>
    <Text style={styles.pageTitle}>Welcome to Taste Finder</Text>
  </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>{isRegistering ? 'Register' : 'Login'}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={isRegistering ? handleRegister : handleLogin}>
          <Text style={styles.buttonText}>{isRegistering ?'Register':'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.guestButton]}
          onPress={() => {
            setShowProgress(true);
            setTimeout(() => {
              navigation.navigate('Home');
            }, 1500);
            setTimeout(() => {
              setShowProgress(false);
            }, 2000);
          }}>
          {showProgress && (
            <Progress.CircleSnail
              style={styles.progress}
              color={['#FF7C60','#FF7C60','#FF7C60']}
              progress={0}
            />
          )}
          <Text style={[styles.buttonText, { color: '#ff7c60' }]}>
            Continue as a guest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleText}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff7c60',
    height: 60,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#ff7c60',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff7c60',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  toggleText: {
    color: '#ff7c60',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  progress: {
    alignSelf: 'center',
    fill: 'transparent',
  },
  guestButton: {
  backgroundColor: 'transparent',
  borderColor: '#ff7c60',
  borderWidth: 2,
  paddingVertical: 15,
  borderRadius: 10,
  marginTop: 20,
},
 pageTitleContainer: {

    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#3B3A3A",
  },
})