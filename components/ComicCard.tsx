import { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Comic } from "../App";

// ComicCard component, extend PureComponent to avoid unnecessary re-renders
export default class ComicCard extends PureComponent {
  render() {
    const props = this.props as Comic;
    return (
      // Conditional rendering, if num is undefined, return null
      props.num === undefined ? null :
        <View style={styles.container}>
          <Text style={styles.title}>{props.safe_title}</Text>
          <Image style={styles.image} source={{ uri: props.img }} />
        </View>
    );
  }
}

// Styles for ComicCard component
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    padding: 10,
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
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
  }
});