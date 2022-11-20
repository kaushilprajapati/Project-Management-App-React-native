import { Button, StyleSheet, Text, View } from 'react-native'
import React , {useEffect, useState}from 'react'
import {AsyncStorage} from 'react-native';

export default function App({ route , navigation }) {

  const name = route.params.data;
  const uName = name;
  const [Ptask , setPtask] = useState(JSON.parse(route.params.Pdata));
  const loginScreen = ()=>{navigation.navigate("Login")}
  const [UserData , setUserData] = useState(JSON.parse(route.params.Udata));
  
  useEffect(() => {
    checkSession();

}, []);


  const checkSession = async() => {
    var value;
    try {
      value = await AsyncStorage.getItem('username');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
    if(value === null)
    {
      console.log("username is null");
      loginScreen();
    }
  }


  const logOut = async() => {
    try {
        await AsyncStorage.removeItem('username');
        console.log("Logout Done");
        loginScreen();
        return true;
    }
    catch(exception) {
      console.log("Error");
        return false;
    }
}



  return (
      <View style = {styles.container}>
        <Text>Hello , {name}</Text>
        <View>
              <Button title = "Logout"
              onPress= {()=>logOut()}
              >
              </Button>
            </View>
      <Button title="Add Project"
      onPress={()=>navigation.navigate("AddProject")}/>
      <Button title="Add User"
      onPress={()=>navigation.navigate("AddUser")}/>
      <Button title="View Projects"
        onPress={()=>navigation.navigate("adminProjectList" , {a:JSON.stringify(uName) ,  PData: JSON.stringify(Ptask)})}/>
      <Button title="View Users"
      onPress={()=>navigation.navigate("userList" , {alluser: JSON.stringify(UserData)})}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
})