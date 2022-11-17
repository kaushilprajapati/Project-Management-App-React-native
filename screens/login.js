import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button } from 'react-native';

export default function App({navigation})  {

    const [username , setUsername] = useState("");
    const [password , setpassword] = useState("");

    return (
            
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
    
              <Text style={styles.text}> Login</Text>
                        
          
    
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter student First name "
            value={username}
            onChangeText={ (v) => setUsername(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter student Last Name"
            value={password}
            onChangeText={ (v) => setpassword(v)}
            />
          
    
            <Button
 
            title="Login"
            onPress={() => {
            
                alert("login done")
             
            }}
          />
    
            <Button
            
            title="AddUser"
            onPress={()=>navigation.navigate("AddUser")}
            // onPress={readData()}
          />
    
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