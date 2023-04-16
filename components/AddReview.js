import {
    Image,
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Modal,
    Pressable,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import { Button } from '@rneui/themed';
  import { Feather } from '@expo/vector-icons';
  import React from 'react';
  import { Platform } from 'react-native';
  
  export function AddReview() {
    const [foodname, onChangeFoodname] = React.useState('');
    const [price, onChangePrice] = React.useState('');
    const [Resname, onChangeResname] = React.useState('');
    const [comment, onChangeComment] = React.useState('');
    const [rating, onChangeRating] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isInputFocused, setInputFocused] = React.useState({
      input1: false,
      input2: false,
      input3: false,
      input4: false,
      input5: false,
    });
  
    return (
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps="never">
          <Text style={styles.label}>Food name</Text>
          <TextInput
            onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
            selectionColor={'#FF7C60'}
            style={isInputFocused.input1 ? styles.inputFocused : styles.input}
            placeholder="Write food name"
            placeholderTextColor="silver"
            onChangeText={onChangeFoodname}
            value={foodname}
          />
          <Text style={styles.label}>Rating</Text>
          <TextInput
            onFocus={() => setInputFocused((prev) => ({ ...prev, input2: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input2: false }))}
            selectionColor={'#FF7C60'}
            style={isInputFocused.input2 ? styles.inputFocused : styles.input}
            onChangeText={onChangeRating}
            value={rating}
            placeholder="Write rating"
            placeholderTextColor="silver"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            onFocus={() => setInputFocused((prev) => ({ ...prev, input3: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input3: false }))}
            style={isInputFocused.input3 ? styles.inputFocused : styles.input}
            selectionColor={'#FF7C60'}
            onChangeText={onChangePrice}
            value={price}
            placeholder="Write price"
            placeholderTextColor="silver"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Restaurant name</Text>
          <TextInput
            onFocus={() => setInputFocused((prev) => ({ ...prev, input4: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input4: false }))}
            style={isInputFocused.input4 ? styles.inputFocused : styles.input}
            selectionColor={'#FF7C60'}
            placeholder="Write Restaurant name"
            placeholderTextColor="silver"
            onChangeText={onChangeResname}
            value={Resname}
          />
  
          <Text style={styles.label}>Comment</Text>
          <TextInput
            onFocus={() => setInputFocused((prev) => ({ ...prev, input5: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input5: false }))}
            selectionColor={'#FF7C60'}
            multiline={true}
            placeholder="Write comment"
            placeholderTextColor="silver"
            style={
              isInputFocused.input5 ? styles.inputMultiFocused : styles.inputMulti
            }
            onChangeText={onChangeComment}
            value={comment}
          />
          <View>
            <Button
              type="outline"
              title="Add photos"
              icon={{
                name: 'image',
                type: 'feather',
                size: 18,
                color: '#FF7C60',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              buttonStyle={{
                marginLeft: 12,
                width: 120,
                borderRadius: 16,
                borderColor: '#FF7C60',
                borderWidth: 1.5,
              }}
              onPress={() => alert('click')}
              containerStyle={{ margin: 5 }}
              titleStyle={{
                fontWeight: '00',
                color: '#FF7C60',
                fontSize: 13,
              }}
            />
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Added Review successfully!</Text>
                  <Pressable
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Share</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
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
  