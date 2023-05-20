import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComicDetails from './components/ComicDetails';
import { Dashboard } from './components/Dashboard';

// Defining type for Stack Navigator
export type RootStackParamList = {
  Dashboard: undefined;
  ComicDetails: {
    comicId: number,
    comic: Comic
  };
};

// Comic type used in whole app
export type Comic = {
  month: string,
  num: number,
  link: string,
  year: string,
  news: string,
  safe_title: string,
  transcript: string,
  alt: string,
  img: string,
  title: string,
  day: string,
}

// Creating Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// App component, contains of Stack Navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          title: 'Dashboard 📃',
          headerStyle: {
            backgroundColor: '#219ebc',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="ComicDetails" component={ComicDetails} options={{
          headerStyle: {
            backgroundColor: '#219ebc',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;