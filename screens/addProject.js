
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Pressable, SafeAreaView  } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

export default function App() {

    const [taskName , setTaskName] = useState("");
    const [taskDescription , settaskDescription] = useState("");
    const [assignedMember , setassignedMember] = useState("");
    const [taskRate , settaskRate] = useState("");  
    const [taskStartDate, settaskStartDate] = useState('');
    const [taskEndDate, settaskEndDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [isComplete, setisComplete] = useState('');

    const baseUrl = "http://10.0.2.2:3000";
    // date start
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      settaskStartDate(date);
      hideDatePicker();
    };

    const getDate = () => {
      let tempDate1 = taskStartDate;
      
      return taskStartDate !== ''
        ? ` ${tempDate1[1]} ${tempDate1[2]} , ${tempDate1[3]}` 
        
        // `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
        : '';
    };

    // date end 
    const showDateEndPicker = () => {
      setDateEndPickerVisibility(true);
    };
  
    const hideDateEndPicker = () => {
      setDateEndPickerVisibility(false);
    };
  
    const handleEndConfirm = (endDate) => {    
      settaskEndDate(endDate);
      hideDateEndPicker();
    };

    const getEndDate = () => {
      
      let tempDate = taskEndDate;
      return taskEndDate !== ''
        ? ` ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
        // `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
        : '';
    };

    // const Alert = () => {
    //   alert('its working!!');
    // }

    // adding project data to database

    const handleSubmitTask = async () => {
      if (!taskName.trim() || !taskDescription.trim()) {
        alert("Please!!.. Enter Valid Inputs");
        return;
      }
      
      try {
        const response = await axios.post(`${baseUrl}/projects`, {
          taskName,
          taskDescription,
          assignedMember,
          taskRate,
          taskStartDate,
          taskEndDate,
        });
        if (response.status === 200) {
          alert(` You have created: ${JSON.stringify(response.data)}`);
          setTaskName('');
          settaskDescription('');
          setassignedMember('');
          settaskRate('');
          settaskStartDate('');
          settaskEndDate('');
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("An error has occurred");
      }
    };
  
  
    return (
      
        <SafeAreaView>
        <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:100 }}>
              <View>
              <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={taskName}
            onChangeText={ (v) => setTaskName(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Task Description...."
            value={taskDescription}
            onChangeText={ (v) => settaskDescription(v)}
            />

            <TextInput
            style={styles.textBoxes}
            placeholder="Task Assign To...."
            value={assignedMember}
            onChangeText={ (v) => setassignedMember(v)}
            />

            <TextInput
            style={styles.textBoxes}
            placeholder=" Add Hourly Rate...."
            value={taskRate}
            onChangeText={ (v) => settaskRate(v)}
            />
                  </View>
            

            <View style={styles.dateBox} >
        <Pressable  onPress={showDatePicker}>
              <Text style={styles.DateTextshow} >Start Date</Text>
        </Pressable>
        {/* <Button title='set End Data'
         onPress={showDateEndPicker}
         /> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
            <TextInput
            style={styles.DateTextInput}
            value={getDate()}
            placeholder="Start Date..."
          />
          </View>

      


        <View style={styles.dateBox1} >
        <Pressable  onPress={showDateEndPicker}>
              <Text style={styles.DateTextshow} >End Date</Text>
        </Pressable>
        {/* <Button title='set End Data'
         onPress={showDateEndPicker}
         /> */}
          <DateTimePickerModal
            isVisible={isDateEndPickerVisible}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideDateEndPicker}
          />
          <TextInput
            style={styles.DateTextInput}
            value={getEndDate()}
            placeholder="End Date..."
          />
         </View>
         <View>
          <Pressable onPress={()=> handleSubmitTask()}>
            <Text style={styles.submit}>SUBMIT TASK</Text>
          </Pressable>
         </View>


      
           

       </View>  
        

    
    

    </SafeAreaView>
   
    ); 
};
    
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
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom:10,
        marginLeft:10,
        
        },
        text:{
          width: 320,
          
          fontSize:20,
          fontWeight:'bold',
          marginTop: -20,
          marginBottom: 20,
          textAlign:'center',
        },
        textToset:{
          height:50,
          width:300,
          color:'red',
          marginBottom:-45,
          paddingTop:20,
          textAlign:'right',
          
        },
        submitText:{
          color:'white',
          textAlign:'center',
          fontSize:15,
          fontWeight:'600'
        },
        dateText:{
          width:500,
         
          color:'red',
          textAlign:'right',
         
        },
        
        dateBox:{
          width:'75%',
          backgroundColor:'yellow',
          flex:1,
          flexDirection:'row-reverse',
          

        },
        dateBox1:{
          width:'75%',
          backgroundColor:'yellow',
          flex:1,
          flexDirection:'row-reverse',
          marginTop:60,

        },
        DateTextInput:{
            width:200,
            height:50,
            borderWidth: 0.5,
            borderRadius: 10,
            fontSize: 18,
            padding: 12,
            borderColor: 'gray',
            marginLeft:100,
          },
          DateTextshow:{
            width:100,
            height:50,
            borderWidth: 0.5,
            borderRadius: 10,
            textAlign:'center',
            fontSize: 16,
            padding: 15,
            borderColor: 'gray',
            marginLeft:5,
            fontWeight:'500',
          },
          submit:{
            
            marginTop:60,
            borderRadius:10,
            borderWidth:0.5,
            height:40,
            width:150,
            fontSize:20,
            textAlign:'center',
            paddingTop:7,
            fontWeight:'600',

          },
        });