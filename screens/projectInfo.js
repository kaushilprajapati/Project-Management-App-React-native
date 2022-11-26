import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput,View,  Image , Pressable, ScrollView } from 'react-native';
import axios from "axios";

const baseUrl = "http://localhost:3000";

export default function ProjectInfo({route}) {

const [task , setTask] = useState([]);
    const [details, setDetails] = useState(JSON.parse(route.params.info));
    const[id , setid] = useState(details._id);
    const[taskName , setTaskName] = useState(details.taskName);
    const [taskDescription , settaskDescription] = useState(details.taskDescription);
    const [assignedMember , setassignedMember] = useState(details.assignedMember);
    const [taskRate , settaskRate] = useState(details.taskRate);  
    const [taskStartDate, settaskStartDate] = useState(details.taskStartDate);
    const [taskEndDate, settaskEndDate] = useState(details.taskEndDate);
   
    const [taskStatus , setTaskStatus] = useState(details.taskStatus);
    const [totalHours , settotalHours] = useState(details.totalHours);
    const[totalAmount, settotalAmount] = useState('');

    const getProjectList = () => {
      
      axios.get('http://localhost:3000/projects')
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setTask(response.data);
        console.log(task);
  
      })
      .catch(error => {
        alert(error);
      });
    
  }







   
   
  


   // update taskinfo

   const handleUpdateTask = async () => {
  
    
    if (taskStatus == "complete" && !totalHours) {
     
      alert("Please enter the total hours");
      return;
    }
    
    try {
      const response = await axios.put(`${baseUrl}/projects/${id}`, {
        _id:id,
        taskName:taskName,
        taskDescription:taskDescription,
        taskStartDate:taskStartDate,
        taskEndDate:taskEndDate,
        assignedMember:assignedMember,
        taskRate:taskRate,
        taskStatus:taskStatus,
        totalHours:totalHours,
        totalAmount:totalAmount
      });
      if (response.status === 200) {
        alert(` You have updted: ${JSON.stringify(response.data)}`);
       
        
        
        } else {
        throw new Error("An error has occurred adding data");
      }
    } catch (error) {
      // alert("An error has occurred");
     
    }
  };
    
    
return (
 
            <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.item}>
        <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                    <Text style={styles.textBoxes} >{taskName}</Text>
                    <Text style={styles.textBoxes} >{taskDescription}</Text>
                    <Text style={styles.textBoxes} >{assignedMember}</Text>
                    <Text style={styles.textBoxes} >Start Date :{taskStartDate}</Text>
                    <Text style={styles.textBoxes} >End Date :{taskEndDate}</Text>
                    <TextInput placeholder="Task Status?" style={styles.textBoxes} value = {taskStatus} onChangeText={(v) => setTaskStatus(v)}/> 
                    <TextInput
                        style={styles.textBoxes}
                        placeholder="Hours You Worked On"
                        value={totalHours}
                        onChangeText={ (v) => settotalHours(v)}
                        />
                   
                    <View>
                        <Pressable onPress={()=> handleUpdateTask()}>
                            <Text style={styles.submit}>UPDATE TASK</Text>
                        </Pressable>
                    </View>
                    
                    
                </View>
                
    </View>
    </ScrollView>
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
   
    submit:{
            
        marginTop:20,
        borderRadius:10,
        borderWidth:0.5,
        height:40,
        width:200,
        fontSize:20,
        textAlign:'center',
        paddingTop:7,
        fontWeight:'600',

      },
    
  
  });