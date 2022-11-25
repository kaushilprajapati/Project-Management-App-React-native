import { Button, Pressable, StyleSheet, Text, View , Image, TextInput } from 'react-native'
import React , {useEffect, useState}from 'react'
import {AsyncStorage} from 'react-native';

export default function App({ route , navigation }) {

  const name = route.params.data;
  const uName = name;
  const [Ptask , setPtask] = useState(JSON.parse(route.params.Pdata));
  const loginScreen = ()=>{navigation.navigate("Login")}
  const [UserData , setUserData] = useState(JSON.parse(route.params.Udata));
  
  useEffect(() => {
    // checkSession();
    
}, []);


  // const checkSession = async() => {
  //   var value;
  //   try {
  //     value = await AsyncStorage.getItem('username');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  //   if(value === null)
  //   {
  //     console.log("username is null");
  //     loginScreen();
  //   }
  // }

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
         <View style={{marginTop : 0, marginLeft: 280, marginBottom: 230}}>
              <Button title = "Logout"
              onPress= {()=>logOut()}
              >
              </Button>
            </View>
        <Text style={styles.textname}>Hello {name}!!</Text>
      
        
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/adduser.gif')} />
              <Pressable onPress={()=>navigation.navigate("AddUser")}>
              <Text style={styles.itemname}>ADDUSER</Text>
              </Pressable>
               
        </View>
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/addproject.gif')} />
              <Pressable onPress={()=>navigation.navigate("AddProject", {UData: JSON.stringify(UserData)})}>
              <Text style={styles.itemname}>ADDPROJECT</Text>
              </Pressable>
               
        </View>
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/viewallproject.gif')} />
              <Pressable onPress={()=>navigation.navigate("adminProjectList" , {a:JSON.stringify(uName) ,  PData: JSON.stringify(Ptask)})}>
              <Text style={styles.itemname}>VIEWPROJECT</Text>
              </Pressable>
               
        </View>
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/viewusers.gif')} />
              <Pressable onPress={()=>navigation.navigate("userList" , {alluser: JSON.stringify(UserData)})}>
              <Text style={styles.itemname}>VIEWUSERS</Text>
              </Pressable>
               
        </View>
       
       
    

       
      {/* <Button title="Add Project"
      onPress={()=>navigation.navigate("AddProject")}/>
      <Button title="Add User"
      onPress={()=>navigation.navigate("AddUser")}/>
      <Button title="View Projects"
        onPress={()=>navigation.navigate("adminProjectList" , {a:JSON.stringify(uName) ,  PData: JSON.stringify(Ptask)})}/>
      <Button title="View Users"
      onPress={()=>navigation.navigate("userList" , {alluser: JSON.stringify(UserData)})}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:270,
    
    },
    item: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      
      width:190,
      maxHeight:50,
      padding:10,
      
      borderWidth:1,
      borderRadius:5,
      marginBottom:20,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      
      justifyContent:'center',
      alignItems:'center',
      
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:16,
      
      color:'black',
  },
  imagestyle:{
    width:40,
    height:40,
    borderRadius:60,
    borderColor:'black',
    borderWidth:1,
    marginRight:20,
  },
  textname:{
    fontSize:25,
    marginBottom:25,
  },
})