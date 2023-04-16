import { memo, useState, useEffect, useCallback } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { IconButton } from '@react-native-material/core';
import { Icon, Image } from 'react-native-elements';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

export const HomePage = memo(({ navigation }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [masterDataSet, setMasterDataSet] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // {paramkey: searchValue} pass the serch avlue to the next page
  //Please display the top 10 food based on the count
  const [topFoods, setTopFoods] = useState([]);
  useEffect(() => {
      // Sort the food items by descending count and get the top 10
      const food = []
      const url = "http://localhost:8000/"
      fetch(url)
        .then(x => x.json())
        .then(json => {
            const sortedFoods = json.sort((a, b) => b.count - a.count);
            const top10Foods = sortedFoods.slice(0, 10);
            setItems(json)
            setTopFoods(top10Foods);
        })
  }, []);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    setSearchValue(q);
    console.log('getSuggestions', filterToken);
    if (typeof q !== 'string' || q.length < 3) {
      setMasterDataSet(null);
      return;
    }
    setLoading(true);

    const suggestions = items
      .filter((item) => item.food_name.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item._id,
        title: item.food_name,
      }));

    setMasterDataSet(suggestions);
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View style={styles.inputContainer}>
          <View
            style={[
              Platform.OS == 'web' ? { width: 220 } : { width: 600 },
              Platform.OS == 'ios' ? { width: 300 } : { width: 600 },
              styles.textBox,
            ]}>
            <AutocompleteDropdown
              inputHeight={44}
              dataSet={masterDataSet}
              closeOnBlur={false}
              useFilter={false}
              clearOnFocus={false}
              showChevron={false}
              inputContainerStyle={{
                color: 'black',
                backgroundColor: '#FFE5DF',
                borderRadius: 25,
              }}
              textInputProps={{
                placeholder: 'Search food',
                placeholderTextColor: '9A9A9A',
                style: {
                  borderRadius: 25,
                  backgroundColor: '#FFE5DF',
                  color: 'black',
                  paddingLeft: 18,
                },
              }}
              onSelectItem={(item) => {
                item && navigation.navigate('Food', { paramkey: item.food_name });
              }}
              loading={loading}
              onChangeText={getSuggestions}
              forcePopupIcon={false}
              EmptyResultComponent={
                <Text style={{ padding: 10, fontSize: 15 }}>No food found</Text>
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Icon
              name="search"
              type="feather"
              color="white"
              onPress={() => {
                navigation.navigate('Result', { paramkey: searchValue });
              }}
            />
          </View>
        </View>
      </View>
      <Text style={{ margin: 7, fontSize: 28, fontWeight: 'bold' }}>
        Top 10 Popular Search
      </Text>
      <FlatList
        data={topFoods}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('Food', { paramkey: item.food_name });
            }}>
            <View style={styles.itemRankingContainer}>
              <Text style={styles.itemRanking}>{index + 1}</Text>
            </View>
            <Image
              style={styles.image}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/857/857681.png',
              }}
            />
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>{item.food_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.food_name}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  flatlist: {
    zIndex: 300,
  },
  search: {
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  image: {
    width: 45,
    height: 45,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 26,

    borderBottomColor: 'gray',
  },
  itemNameContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  itemRankingContainer: {
    width: 60,
    color: '#FF7C60',
    alignItems: 'center',
  },
  itemRanking: {
    color: '#FF7C60',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textBox: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    backgroundColor: '#FF7C60',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 75,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
