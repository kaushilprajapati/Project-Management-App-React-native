import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView , Image , TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function App({ route }) {
    const [projectArrays , setProjectArrays] = useState(JSON.parse(route.params.projectData));
    const [completedProjs, setCompletedProjs] = useState([]);

    useEffect(() => {
        completedProjects();
    },[]);
    
    // const getProjectMainList = () => {
      
    //     axios.get(`${baseUrl}/mainprojects`)
    //     .then(function(response) {
    //       // alert(JSON.stringify(response.data));
          
    //       setProjectArrays(response.data);
    //       // console.log(projectArr);
    
    //     })
    //     .catch(error => {
    //       alert(error);
    //     });
    // }


const completedProjects = () =>{
   var a = [];
    projectArrays.forEach((element) => {
            // alert(data[0]._id);
        //console.log(element.assignedMember);
       if(element.isComplete == true){
            a.push(element);
            // console.log(a);
       }

      
       setCompletedProjs(a);
   
  });
}

   

const itemSeparator = () => {
    return <View style = {styles.separator} />
   }




  return (
         
    <SafeAreaView>
        
       
  
    <ScrollView style={styles.scrollView}>
    
    <FlatList
    data = {completedProjs}
    ItemSeparatorComponent = { itemSeparator }

    renderItem = { ( {item , index} ) => (
        <TouchableOpacity onPress= {()=>alert("GG EZ PZ")} >
{/*         
          <Swipeable renderLeftActions={() => 
        
          <TouchableOpacity onPress={ () => handleDelete(index)} >
            <View style={styles.deletebox}>
              <Text style={styles.delete}>Delete</Text>
            </View>
          </TouchableOpacity>
          }> */}

            <View style={styles.item}>
                <View style={styles.avatarContainer} >
                   <Image style={styles.imagestyle} source = {require('../assets/5956592.png')} />
                </View>
                <Text style={styles.itemname}>{item.projectName}</Text>
                <Text style={styles.itemname}>Total Amount: {item.totalAmount}</Text>
            </View>
          {/* </Swipeable> */}
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
  
  })