
import { useState , useEffect} from 'react';
import { StyleSheet, Text, TextInput, FlatList, View,VariantsBox, TouchableOpacity , Button, Pressable, SafeAreaView  } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";


export default function App({route}) {
    
    const [projectName , setProjectName] = useState("");
    const [taskName , setTaskName] = useState("");
    const [taskDescription , settaskDescription] = useState("");
    const [assignedMember , setassignedMember] = useState("");
    const [taskRate , settaskRate] = useState("");  
    const [taskStartDate, settaskStartDate] = useState('');
    const [taskEndDate, settaskEndDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [isComplete, setisComplete] = useState('');
    const [projectArrays , setProjectArrays] = useState(JSON.parse(route.params.projectData));
    const [userData , setUserData] = useState(JSON.parse(route.params.UData));
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const [isUserOpen, setIsUserOpen] = useState(false);

    const [taskDetails , setTaskDetails] = useState([]);
    const [assignMemberId, setAssignMemberId] = useState({
      email: "Assign Task To User",
    });

    const [assignProjectId, setAssignProjectId] = useState({
      projectName: "Select a Project for the Task",
    });


 
  

    useEffect(() => {
     // getProjectMainList();
     getProjectList();
  }, []);


  const getCharacters = () => {
      
    axios.get(`${baseUrl}/users`)
    .then(function(response) {
      // alert(JSON.stringify(response.data));
      
      setUserData(response.data);

      // console.log(data);

    })
    .catch(error => {
      alert(error);
    });
}
const getProjectList = () => {
      
  axios.get(`${baseUrl}/projects`)
  .then(function(response) {
    // alert(JSON.stringify(response.data));
    
    setTaskDetails(response.data);
    // console.log(data);

  })
  .catch(error => {
    alert(error);
  });
}




    const getProjectMainList = () => {
      
      axios.get(`${baseUrl}/mainprojects`)
      .then(function(response) {
        // alert(JSON.stringify(response.data));
        
        setProjectArrays(response.data);
        // console.log(projectArr);
  
      })
      .catch(error => {
        alert(error);
      });
  }

    const baseUrl = "http://localhost:3000";
    // date start
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      settaskStartDate(date.toString());
      hideDatePicker();
    };

    const getDate = () => {
      return taskStartDate.toString();
    };

    // date end 
    const showDateEndPicker = () => {
      setDateEndPickerVisibility(true);
    };
  
    const hideDateEndPicker = () => {
      setDateEndPickerVisibility(false);
    };
  
    const handleEndConfirm = (endDate) => {    
      settaskEndDate(endDate.toString());
      hideDateEndPicker();
    };

    const getEndDate = () => {
      return taskEndDate.toString();
    };

    // const checkMainProject = () =>{
       
    //    for(var i = 0 ; i<projectArr.length;i++){
            
    //            if(projectArr[i].projectName == projectname){
    //              alert("alrady present");
    //            }
        
    //    }
    // }

    const handleSubmitTask = async () => {

      
      if (!taskName.trim() || !taskDescription.trim()) {
        alert("Please!!.. Enter Valid Inputs");
        return;
      }
      
      try {
        const response = await axios.post(`${baseUrl}/projects`, {
          projectName,
          taskName,
          taskDescription,
          assignedMember,
          taskRate,
          taskStartDate,
          taskEndDate,
        });
        if (response.status === 200) {
          alert(` You have created: ${JSON.stringify(response.data)}`);
          setProjectName('');
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

              {/* for the project list  */}
                
              <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            setIsProjectOpen(true);
            getProjectMainList();
          }}
        >
        <Text style={styles.textBoxes} >{assignProjectId.projectName}</Text>
        </TouchableOpacity>
        {isProjectOpen && (
          <View style={[styles.textBoxes, { height: null }]}>
            {isProjectOpen &&
              projectArrays.map((i) => {
                return (
                  <View
                    style={{ width: "80%", margin: 10, borderBottomWidth: 1 }}
                  >
                    <Text
                      onPress={() => {
                        setAssignProjectId({ projectName: i.projectName});
                        setIsProjectOpen(false);
                        setProjectName(i.projectName);
                      }}
                    >
                      {i.projectName}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}


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

            {/* <TextInput
            style={styles.textBoxes}
            placeholder="Task Assign To...."
            value={assignedMember}
            onChangeText={ (v) => setassignedMember(v)}
            /> */}

<TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            setIsUserOpen(true);
            getCharacters();
          }}
        >
        <Text style={styles.textBoxes} >{assignMemberId.email}</Text>
        </TouchableOpacity>
        {isUserOpen && (
          <View style={[styles.textBoxes, { height: null }]}>
            {isUserOpen &&
              userData.map((i) => {
                return (
                  <View
                    style={{ width: "80%", margin: 10, borderBottomWidth: 1 }}
                  >
                    <Text
                      onPress={() => {
                        setAssignMemberId({ email: i.email});
                        setIsUserOpen(false);
                        setassignedMember(i.email);
                      }}
                    >
                      {i.email}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}
      



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
            <Text
            style={styles.DateTextInput}
            
          > {getDate()}</Text>
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
          <Text
            style={styles.DateTextInput}
          >{getEndDate()}</Text>
         </View>
         <View>

        
          <Pressable onPress={()=> handleSubmitTask()}>
            <Text style={styles.submit}>SUBMIT TASK</Text>
          </Pressable>
         </View>

         {/* <Button title='check project'
         onPress={()=> checkMainProject()}/> */}
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