import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView , Image , TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import axios from "axios";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Projectlist({ route , navigation }) {

    const [name , setName] = useState(JSON.parse(route.params.projectName));
   
     const [taskData, setTaskData] = useState(JSON.parse(route.params.data));

    // const [taskData, setTaskData] = useState([]);
    const [data , setData] =  useState([]);
    const [assignTask , setAssignTask] = useState([]);
   
  
  

    //1 time page
    //2nd time page
    useEffect(() => {
        getProjectList();
        // taskDetails();
    },[]);
  
     const getProjectList = () => {
      
      axios.get('http://localhost:3000/projects')
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setTaskData(response.data);
        console.log(taskData);
  
      })
      .catch(error => {
        alert(error);
      });
     taskDetails();
  }

//   const projectDetails = async() =>{
//    var a = [];
//     const gg = await data.forEach((element) => {
//         console.log(element.assignedMember);
//        if(element.assignedMember == name){
//             a.push(element);
//            // console.log(a);
//        }
//        setAssignTask(a);
   
//   });
// }
const taskDetails = () =>{
     var a = [];
      taskData.forEach((element) => {
              // alert(data[0]._id);
          //console.log(element.assignedMember);
         if(element.projectName == name){
              a.push(element);
            //   console.log(a);
  
         }
         setAssignTask(a);
     
    });
  }





const itemSeparator = () => {
    return <View style = {styles.separator} />
   }




  return (
         
    <SafeAreaView>
        
        {/* <Button title='get Data'
        onPress={()=>projectDetails()}/> */}
  
    <ScrollView style={styles.scrollView}>
   <Text style={styles.textBoxes}>Task list for project: {name}</Text>
    <FlatList
    data = {assignTask}
    ItemSeparatorComponent = { itemSeparator }

    renderItem = { ( {item , index} ) => (
        <TouchableOpacity onPress= {()=>navigation.navigate("ProjectInfo" , {info:JSON.stringify(item)})} >
        
          <Swipeable renderLeftActions={() => 
          {
        
          <TouchableOpacity onPress={ () => handleDelete(index)} >
            <View style={styles.deletebox}>
              <Text style={styles.delete}>Delete</Text>
            </View>
          </TouchableOpacity>
        } }>
         

            <View style={styles.item}>
                <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                <Text style={styles.itemname}>{item.taskName}</Text>
            </View>
          </Swipeable>
        </TouchableOpacity>
    )}
      
    />
    </ScrollView>  
</SafeAreaView>

);
}


// style part start herer //
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
      flexDirection:'row',
      alignItems: 'center',
      paddingVertical: 13,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      height:59,
      width:59,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:20,
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:16,
      marginLeft:13,
  },

    deletebox:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:"center",
        width:100,
        height:120,
        
    },

    delete:{
      fontSize:20,
      paddingBottom:25,
    },

    input:{height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },

    item1: {
      backgroundColor:'#ADD8E6',
      borderRadius:'5',
      margin:10,
    },

    i: {
      
      width:'100%',
      height:20,
      textAlign:'center',
      marginTop:10,
      fontSize:18,
      
    },

    imagestyle:{
      width:40,
      height:40,
    },
    textBoxes: {
      width: 400, 
      fontSize: 18,
      padding: 12,
      borderColor: 'black', 
      borderWidth: 0.5,
      borderRadius: 10,
      marginBottom:10,
      marginLeft:10,
      marginTop:10,
      textAlign:'center',
      
      },
  
  });