import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import Constants from "expo-constants";

const baseUrl = "http://10.0.2.2:3000";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onChangeFirstNameHandler = (firstName) => {
    setFirstName(firstName);
  }; 

  const onChangeLastNameHandler = (lastName) => {
    setLastName(lastName);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeJobTitleHandler = (jobTitle) => {
    setJobTitle(jobTitle);
  };

  const onSubmitFormHandler = async (event) => {
    if (!firstName.trim() || !email.trim()) {
      alert("Please!!.. Enter Valid Inputs");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users`, {
        email,
        firstName,
        lastName,
        password,
        jobTitle,
        isAdmin,
      });
      if (response.status === 200) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFirstName('');
        setIsAdmin(false);
        setLastName('');
        setJobTitle('');
        setEmail('');
        setPassword('');
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.wrapper}>
          {isLoading ? (
            <Text style={styles.formHeading}> CREATING RESOURSES </Text>
          ) : (
            <Text style={styles.formHeading}>CREATE NEW USER</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={firstName}
            editable={!isLoading}
            onChangeText={onChangeFirstNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={lastName}
            editable={!isLoading}
            onChangeText={onChangeLastNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Job Title"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={jobTitle}
            editable={!isLoading}
            onChangeText={onChangeJobTitleHandler}
          />
        </View>

        <View style={styles.wrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={password}
            editable={!isLoading}
            onChangeText={onChangePasswordHandler}
          />
        </View>

        <View style={styles.wrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={onChangeEmailHandler}
          />
        </View>
        <View>
          <Pressable style={styles.submitinput} onPress={onSubmitFormHandler}>
              <Text style={styles.submitText}>SUBMIT</Text>
          </Pressable>
          {/* <Button
            title="Submit"
            onPress={onSubmitFormHandler}
            style={styles.submitButton}
            disabled={isLoading}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  formHeading: {
    
    color: "#ffffff",
    fontSize:25,
    fontWeight:'500',
    textAlign:'center',
  },
  wrapper: {
    marginBottom: 10,
    color:"#ffffff",
  },
  input:  {
    width: 300, 
    fontSize: 18,
    padding: 12,
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    color: "#ffffff",
    
    },
  submitButton: {
    backgroundColor: "gray",
    padding: 100,
  },

  submitinput:{
    width: 300, 
    fontSize: 18,
    padding: 12,
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    backgroundColor:'white',
  },

  submitText:{
    textAlign:'center',
    fontSize:15,
    fontWeight:'600'
  },
});