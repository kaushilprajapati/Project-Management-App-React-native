import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput,View,  Image , Pressable, ScrollView } from 'react-native';
import CheckBox from "./checkBox";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function ProjectInfo({route}) {

    const [details, setDetails] = useState(JSON.parse(route.params.info));
    const[id , setid] = useState(details._id);
    const[taskName , setTaskName] = useState(details.taskName);
    const [taskDescription , settaskDescription] = useState(details.taskDescription);
    const [assignedMember , setassignedMember] = useState(details.assignedMember);
    const [taskRate , settaskRate] = useState(details.taskRate);  
    const [taskStartDate, settaskStartDate] = useState(details.taskStartDate);
    const [taskEndDate, settaskEndDate] = useState(details.taskEndDate);
    const [isComplete, setisComplete] = useState(false);
    const [taskStatus , setTaskStatus] = useState('running')
    const [totalHours , settotalHours] = useState(details.totalHours);
    const[totalAmount, settotalAmount] = useState('');

    const baseUrl = "http://10.0.2.2:3000";

    useEffect(() => {
      getProjectList();
  }, []);

  const getProjectList = () => {
      
    axios.get(`${baseUrl}/projects`)
    .then(function(response) {
      
      // setProjectData(response.data);
      setDetails(response.data);
      // details = response.data;
      // alert(JSON.stringify(response.data));
       console.log(details);
      //  alert(details.taskName);
    })
    .catch(error => {
      alert(error);
    });
  }

   
   
    function totalamount(){
        var total = taskRate*totalHours;
        var t = total.toString();
        settotalAmount(t);
    
    }


   // update taskinfo

   const handleUpdateTask = async (event) => {
    totalamount();
    if (!totalHours) {
      alert(id);
      console.log(id);
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
        isComplete:isComplete,
        totalHours:totalHours,
        totalAmount:totalAmount
      });
      if (response.status === 200) {
        alert(` You have updted: ${JSON.stringify(response.data)}`);
        console.log(id);
        console.log(response.data);
        settotalHours(totalHours);
        isComplete(true);
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
                    <Text style={styles.textBoxes} >Task Status : Running </Text>
                    <TextInput
                        style={styles.textBoxes}
                        placeholder="Hours You Worked On"
                        value={totalHours}
                        onChangeText={ (v) => settotalHours(v)}
                        />
                    <View>
                    <CheckBox
                        style={styles.check}
                        onPress={() => setisComplete(!isComplete)}
                        title="Is Complete?"
                        isChecked={isComplete}
                    />
                    </View>
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