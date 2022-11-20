import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View , Button, Alert } from 'react-native';
import axios from "axios";
import { AsyncStorage } from 'react-native';

const baseUrl = "http://10.0.2.2:3000";

export default function App({navigation})  {

    const [username , setUsername] = useState("");
    const [password , setpassword] = useState("");
    const [userFname , setUserFname] = useState("");
    const [data , setData] = useState("");
    const [projectData , setProjectData] = useState([]);
  

    const getProjectList = () => {
      
      axios.get(`${baseUrl}/projects`)
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setProjectData(response.data);
        console.log(data);
  
      })
      .catch(error => {
        alert(error);
      });
  }

  // const checkSession = async(username) => {
  //   try{
  //   await AsyncStorage.getItem('username').then(value => this.setState({ getValue: value }) );
  //     value = AsyncStorage.getItem('username').then(value => this.setState({ getValue: value }) );
  //   }
  //   catch(exception) {
  //     return false;
  // }
  //   if(value == null)
  //   {
  //     ()=>navigation.navigate("login.js");
  //   }

  // }
  const setSession = async (username) => {
    try {
      console.log("username is set");
      await AsyncStorage.setItem('username',username);
    } catch (error) {
      console.log(error);
    }
  };

  // const logOut = async() => {
  //     try {
  //         await AsyncStorage.removeItem('username');
  //         console.log("Logout Done")
  //         return true;
  //     }
  //     catch(exception) {
  //       console.log("Error");
  //         return false;
  //     }
  // }
  
    useEffect(() => {
      getCharacters();
      getProjectList();
    }, []);
  
     const getCharacters = () => {
      
      axios.get(`${baseUrl}/users`)
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setData(response.data);
  
        console.log(data);
  
      })
      .catch(error => {
        alert(error);
      });
  }
 
  const adminHome = ()=>{navigation.navigate("AdminHome", { data: username , Pdata: JSON.stringify(projectData),  Udata: JSON.stringify(data)})}
  const userHome = ()=>{navigation.navigate("UserHome",{ data: username,Pdata: JSON.stringify(projectData) })}
   
  
  const auth = () => {


    data.forEach((element) => {

      if(username.toLocaleLowerCase() === element.email && password === element.password)
      {
        setSession(username);
        setUsername('');
        setpassword('');
        if(element.isAdmin == true){
          adminHome();
          // alert(' successfully login as ' + username);
        }else{
          userHome();
          // alert(' successfully login as ' + username);

        }
      }
      
  });
  
  
  }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           
            <View>

              <Text style={styles.text}> Login</Text>
                        
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter Email Address "
            value={username}
            onChangeText={ (v) => setUsername(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter Password"
            value={password}
            onChangeText={ (v) => setpassword(v)}
            />
        
            <Button
 
            title="Login"
            onPress={() => {auth()}}
          />
    
            {/* <Button
            
            title="AddUser"
            onPress={()=>navigation.navigate("AddUser")}
            // onPress={readData()}
          /> */}
    
            </View>
    </View>
    ); 
                        
                    
                    
       
    }
    
    const styles = StyleSheet.create({
        container: {  
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
        textBoxes: {
        width: 300, 
        fontSize: 18,
        padding: 12,
        borderColor: 'gray', 
        borderWidth: 0.2,
        borderRadius: 10,
        marginBottom:10,
        marginLeft:10,
        
        },
        text:{
          fontSize:20,
          fontWeight:'bold',
          marginTop: -20,
          marginBottom: 20,
          marginLeft:121
    
        },
        });

// export default function App({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Button
//        title ="go to add user"
       
//        onPress={() => 
//     navigation.navigate("AddUser")}>

//       </Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }