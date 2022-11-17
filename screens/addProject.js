import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View , Button, Pressable  } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {

    const [taskName , setTaskName] = useState("");
    const [taskDesc , setTaskDesc] = useState("");
    const [taskAssign , setTaskAssign] = useState("");
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setDate(date);
      hideDatePicker();
    };

    const getDate = () => {
      let tempDate = date.toString().split(' ');
      return date !== ''
        ? ` ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
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
      setEndDate(endDate);
      hideDateEndPicker();
    };

    const getEndDate = () => {
      let tempDate = endDate.toString().split(' ');
      return endDate !== ''
        ? ` ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
        // `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} , ${tempDate[3]}`
        : '';
    };

    const Alert = () => {
      alert('its working!!');
    }

  
  
    return (
            
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
    
              <Text style={styles.text}> Add Task</Text>
                        
          
    
            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={taskName}
            onChangeText={ (v) => setTaskName(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Task Description...."
            value={taskDesc}
            onChangeText={ (v) => setTaskDesc(v)}
            />

            <TextInput
            style={styles.textBoxes}
            placeholder="Task Assign To...."
            value={taskAssign}
            onChangeText={ (v) => setTaskAssign(v)}
            />


          
        
          
         <Button title='set start Data'
         onPress={showDatePicker}
         />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <TextInput
            style={styles.textBoxes}
            value={getDate()}
            placeholder="Start Date..."
          />



<Button title='set start Data'
         onPress={showDateEndPicker}
         />
          <DateTimePickerModal
            isVisible={isDateEndPickerVisible}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideDateEndPicker}
          />
          <TextInput
            style={styles.textBoxes}
            value={getEndDate()}
            placeholder="Start Date..."
          />

      
     
      {/* <Text>{endDate.toString()}</Text> */}
            
          <Button
              title="submit Task"
              onPress={() => {alert("task submitted done") }}
              />
        
            
         
    </View>
   
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
        borderWidth: 0.2,
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
       
        });