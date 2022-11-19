import React , {useState} from 'react';
import { StyleSheet, Text, TextInput,View,  Image } from 'react-native';




export default function ProjectInfo({route}) {
    
   const[taskname , setTaskName] = useState("")
   const details  = route.params.info;
   console.log(details.taskName);
    
return (
            
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.item}>
        <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                    <Text style={styles.textBoxes} >{details.taskName}</Text>
                    <Text style={styles.textBoxes} >{details.taskDescription}</Text>
                    <Text style={styles.textBoxes} >Start Date :{details.taskStartDate}</Text>
                    <Text style={styles.textBoxes} >End Date :{details.taskEndDate}</Text>
                    
                    
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
    separator:{
      height: 1,
      width: '100%',
      backgroundColor: '#CCC',
  
    },
    item: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      paddingVertical: 13,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      height:89,
      width:89,
      justifyContent:'center',
      alignItems:'center',
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:36,
      marginTop:20,
  },
  imagestyle:{
    width:40,
    height:40,
  },
  textBoxes: {
    width: 300, 
    fontSize: 20,
    padding: 12,
    fontWeight:'700',
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    textAlign:'center',
    marginTop:10,
    
    },
  
  });