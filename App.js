import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Login from './screens/login';
import AddUser from './screens/addUser';
import AdminHome from './screens/adminHome';
import AddProject from './screens/addProject';
import UserHome from './screens/userHome';
import Projectlist from './screens/Projectlist';
import ProjectInfo from './screens/projectInfo';
import adminProjectList from './screens/adminProjectList';
import userList from './screens/userList';
import adminTaskList from './screens/adminTaskList';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName = {Login}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="AdminHome" component={AdminHome}/>
      <Stack.Screen name = "UserHome" component={UserHome}/>
      <Stack.Screen name="AddProject" component={AddProject}/>
      <Stack.Screen name="Projectlist" component={Projectlist}/>
      <Stack.Screen name="adminProjectList" component={adminProjectList}/>
      <Stack.Screen name='ProjectInfo' component={ProjectInfo}/>
      <Stack.Screen name='userList' component={userList}/>
      <Stack.Screen name='adminTaskList' component={adminTaskList}/>
      

    </Stack.Navigator>
    </NavigationContainer>
  );
}


