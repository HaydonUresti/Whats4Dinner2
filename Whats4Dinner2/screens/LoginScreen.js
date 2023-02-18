import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React, { useEffect ,useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'


const LoginScreen = () => {

    // Creating state to store and handle the user's email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Creating the navigation tool to handle changing screens
    const navigation = useNavigation()

    // Calling the React Native hook useEffect as a listener for if a user in signed in. 
    // This handles the changing of screens if a user is signed in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                navigation.replace("Main")
            }
        })  
        return unsubscribe
    }, [])

    const doLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email, ' logged in.')
        })
    }

    const doRegister = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email, ' just registered.')
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={[styles.container,{backgroundColor:'#2E4052'}]}>

                {/* The text input fields */}
                <TextInput 
                 value={email}
                 placeholder='Email' 
                 style={[styles.input, styles.email]}
                 onChangeText={text => setEmail(text)} >

                </TextInput>

                <TextInput 
                  value={password}
                  placeholder='Password'
                  style={[styles.input, styles.password]}
                //   secureTextEntry
                  onChangeText={text => setPassword(text)}>
                  
                </TextInput>
            

            {/* View for the buttons */}
            <View style={styles.buttonContainer}>

            {/* Register button */}
            <TouchableHighlight
            onPress={doLogin}
            style={[styles.button, styles.login]}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            
            {/* Register button */}
            <TouchableHighlight
            onPress={doRegister}
            style={[styles.button, styles.register]}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableHighlight>
            
            </View>

        </View>
    )
}


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
        backgroundColor: 'green'
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


    export default LoginScreen