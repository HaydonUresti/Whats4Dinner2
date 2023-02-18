import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React, { useEffect ,useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import {firebase} from '../firebase'


// The ChangePassword screen
const ChangePassword = () =>{

    const navigation = useNavigation()

    // State to hold the new password
    const [newPassword, setNewPassword] = useState('')

    // A function that changes the password and changes the screen to MainScreen
    // Parameters: None
    // Returns: None
    const doChangePassword = () => {
        const user = firebase.auth().currentUser;

        user.updatePassword(newPassword)
        .then(() => {
            console.log("Password has been updated")
        })

        navigation.replace("Main")

    }

    const cancelChange = () => {
        navigation.replace("Main")
    }

    return (
    <View style={[styles.container,{backgroundColor:'#2E4052'}]}>

                {/* The text input fields */}
                <TextInput 
                 value={newPassword}
                 onChangeText={(text) => setNewPassword(text)}
                 placeholder='New Password' 
                 style={[styles.input, styles.email, {textAlign: 'center'}]}
                  >

                </TextInput>

                
            

            {/* View for the buttons */}
            <View style={styles.buttonContainer}>

            {/* Change password button */}
            <TouchableHighlight
            onPress={doChangePassword}
            style={[styles.button, styles.login]}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={cancelChange}
            >
                <Text>Cancel</Text>
            </TouchableHighlight>
            
            
            </View>

        </View>
)}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        fontSize: 22,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    email: {
        height: 50,
        margin: 20,
        fontWeight: 'bold'
    },
    password: {
        marginTop: 25,
        marginBottom: 20

    },
    button: {
        width: '60%',
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
        
        // marginLeft: 60
    },
    login: {
        borderColor: 'blue',
        // borderWidth: 3,
        backgroundColor: 'orange'
    },
    register: {
        marginTop: 10,
        backgroundColor: 'gold'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
    }
    })

export default ChangePassword;