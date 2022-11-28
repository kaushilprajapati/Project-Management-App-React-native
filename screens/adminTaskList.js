import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView , Image , TouchableOpacity, Button, ScrollView, TextInput, Pressable } from 'react-native';
import axios from "axios";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Projectlist({ route , navigation }) {

    const [name , setName] = useState(JSON.parse(route.params.projectName));
    const [taskStatusName , setTaskStatusName] = useState("");
   
     const [taskData, setTaskData] = useState(JSON.parse(route.params.data));

    // const [taskData, setTaskData] = useState([]);
    const [data , setData] =  useState([]);
    const [assignTask , setAssignTask] = useState([]);
   
    useEffect(() => {
      taskDetails();
      
  }, []);
 
  
     const getProjectList = () => {
      
      axios.get('http://localhost:3000/projects')
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setTaskData(response.data);
        // console.log(taskData);
        
  
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
         setTaskStatusName("")
     
    });
  }

  const completeTask = () =>{

    var a = [];
    assignTask.forEach((element) => {
            // alert(data[0]._id);
        //console.log(element.assignedMember);
       if(element.taskStatus == 'complete'){
            a.push(element);
          //   console.log(a);

       }
       setAssignTask(a);
       setTaskStatusName("Completed Task")
      
   
  });

  }

  const runningTask = () =>{

    var a = [];
    assignTask.forEach((element) => {
            // alert(data[0]._id);
        //console.log(element.assignedMember);
       if(element.taskStatus == 'running'){
            a.push(element);
          //   console.log(a);

       }
       setAssignTask(a);
       setTaskStatusName("Running Task")
       

       
  });

  }





const itemSeparator = () => {
    return <View style = {styles.separator} />
   }




  return (
         
    <SafeAreaView>
        
  
    <ScrollView style={styles.scrollView}>
    <View style={styles.buttonContainer}>
      <Pressable style={styles.buttonTaskShow} onPress={()=>getProjectList()}><Text>ALL TASKS</Text></Pressable>
      <Pressable style={styles.buttonTaskShow} onPress={()=>completeTask()}><Text>COMPLETED TASKS</Text></Pressable>
      <Pressable style={styles.buttonTaskShow} onPress={()=>runningTask()}><Text>RUNNING TASKS</Text></Pressable>
    </View>
   <Text style={styles.textBoxes}>Project: {name} {taskStatusName}</Text>
    <FlatList
    data = {assignTask}
    ItemSeparatorComponent = { itemSeparator }

    renderItem = { ( {item , index} ) => (
        <TouchableOpacity onPress= {()=>navigation.navigate("ProjectInfo" , {info:JSON.stringify(item)})} >
        
        
         
            
            <View style={styles.item}>
                <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                <Text style={styles.itemname}>{item.taskName}</Text>
                <Text style={styles.MemberText}>Owner:</Text>
                <Text style={styles.itemMember}>{item.assignedMember}</Text>
            </View>
          
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
      width:100,
  },
    itemMember:{
      fontWeight:'600',
      fontSize:16,
      textAlign:'center',
      padding:5,
      color:'#7393B3',
      },
      MemberText:{
        fontWeight:'600',
      fontSize:16,
      
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
      buttonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
      
      },

      buttonTaskShow:{
        backgroundColor:'#FAF9F6',
        borderColor:'black',
        borderWidth:0.6,
        marginTop:10,
        marginRight:5,
        borderRadius:5,
        padding:5,


      }
  
  });