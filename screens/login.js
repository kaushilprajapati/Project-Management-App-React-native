import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View , Button } from 'react-native';
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function App({navigation})  {

    const [username , setUsername] = useState("");
    const [password , setpassword] = useState("");
    const [data , setData] = useState("");


    useEffect(() => {
      getCharacters();
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

  const adminHome = ()=>{navigation.navigate("AdminHome")}
  const userHome = ()=>{navigation.navigate("UserHome")}
  
  const auth = () => {
  
    for(var i =0; i<data.length; i++) {
      if(username.toLocaleLowerCase() === data[i].email && password.toLocaleLowerCase() === data[i].password){
        if(data[i].isAdmin == true){
          adminHome();
        }
        if(data[i].isAdmin == false)
        {
          userHome();
        }
        alert(' successfully login as ' + username);
        
        break;
      }
      else{
        alert('enter valid username');
      }
    }
  
    
  
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
// });