import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';

// Specific food page
export function DishPage({ navigation, route }) {
    const [specificFood, setSpecificFood] = useState("");
    useEffect(() => {
        const url = "http://localhost:8000/"
        fetch(url)
          .then(x => x.json())
          .then(json => {
            setSpecificFood(json.find((f) => f.food_name === route.params.paramkey)),
            console.log(specificFood)
          })
    }, []);
  

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
          <Card 
          elevation= {2}
          style={{ borderRadius: 18,marginBottom:16}}>
          <View key={index} style={styles.reviewContainer}>
        
            <Text style={styles.restaurantNameText}>
              {review.restaurant_name}
            </Text>
            <Text style={styles.addressText}>
              Address: {review.restaurant_address}
            </Text>
            <Text style={styles.ratingText}>{starRating}</Text>
            <Text style={styles.descriptionText}>{review.description}</Text>
          </View>
           </Card>
        ))}
    
    </View>
  );
}

const styles = StyleSheet.create({
  dishPage: {
    flex: 1,
    padding: 1,
    backgroundColor: '#fff',
  },
  foodNameText: {
    fontSize: 24,
    paddingLeft: 6,
    paddingTop: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewContainer: {
    padding: 14,
    marginBottom: 20,
  },
  restaurantNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
  },
  addressText: {
    marginBottom: 3,
  },
  ratingText: {
    marginTop: 10,
    marginBottom: 4,
  },
  descriptionText: {
     fontSize: 17,
    marginTop: 10,
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
});
