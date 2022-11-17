import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './screens/login';
import AddUser from './screens/addUser';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName = {Login}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddUser" component={AddUser} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

