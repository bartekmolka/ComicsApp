import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { RootStackParamList } from "../App";

// Defining type for ComicScreenProps
type ComicDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ComicDetails'>;

// ComicDetails component
export default function ComicDetails({ route, navigation }: ComicDetailsScreenProps) {
  
  const { comicId, comic } = route.params;

  // Setting title of the subview
  useEffect(() => {
    navigation.setOptions({ title: comic.title });
  }, []);


  // Component contains comic details such as image, number, date and alternative text
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: comic.img }} />
      <Text style={styles.text}>
        Number: {parseInt(JSON.stringify(comicId))}
      </Text>
      <Text style={styles.text}>
        Date: {comic.day}/{comic.month}/{comic.year}
      </Text>
      <Text style={styles.alt}>
        Alternative text: {comic.alt}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}


// Styles for ComicDetails component
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    backgroundColor: '#90e0ef',
    alignItems: 'center',
    elevation: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ translateY: -23 }],
    fontStyle: 'italic',
    backgroundColor: '#219ebc',
    padding: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 10,
    color: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#023047',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alt: {
    width: '70%',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});