import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import FormCompanyScreen from './screens/FormCompanyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Accueil' }} component={HomeScreen} />
        <Stack.Screen name="UploadCSV" component={UploadScreen} />
        <Stack.Screen name="InformationEntreprise" options={{ title: 'Info entreprise' }} component={FormCompanyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}