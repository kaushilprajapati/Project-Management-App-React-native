import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function App({navigation}) {
  return (
      <View style = {styles.container}>
      <Button title="Add Project"
      onPress={()=>navigation.navigate("AddProject")}/>
      <Button title="Add User"
      onPress={()=>navigation.navigate("AddUser")}/>
      <Button title="View Projects"/>
      <Button title="View Users"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
})