import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button} from 'react-native';
import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { doCreatData } from '../firebaseFunctions';
import {firebase} from '../firebase'

// A method that contains the code of the pop-up modal (screen)
// Parameters: visible: Whether or not the modal is currently visible and interactive to the user.
//             onClose: This is used to hold the current value of the modal's visibility, in order to change it.
// Returns: The visual components making up the modal and the function calls usable by the user. 
const MondayMealNoteModal = ({visible, whatDay, onClose, onSubmit}) => {


    // Creating state to hold the values given in the meal note.
    const [MealTitle, setTitle] = useState('');
    const [MealDescription, setDesc] = useState('');


    // Creating the tokens AsyncStorage uses to hold data
    let MONDAY_TITLE_KEY = '@Monday_Title_input';
    let MONDAY_DESC_KEY = '@Monday_Desc_input';
  


    const doCreateData = (dataToAdd) => {
        const dataRef = firebase.firestore().collection('MondayData');
        // const [addData, setData] = useState('');
    
        if(dataToAdd && dataToAdd.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: dataToAdd,
                createdAt: timestamp
            };
            dataRef
                .add(data)
                .catch(error => alert(error.message))
        }
    }
    
    // A method that handles the submission of a meal note
    // Parameters: None
    const doSubmit = () => {
        doCreateData(MealTitle)
    };
    

//  A function that handles the saving of the given data. Save method: AsyncStorage.
// Parameters: None
// Returns: None
    const onSubmitData = async () => {
        try {
            await AsyncStorage.setItem(MONDAY_TITLE_KEY, MealTitle)
            await AsyncStorage.setItem(MONDAY_DESC_KEY, MealDescription)
        } catch (err) {
            console.log("There is an error in onSubmitData")
        };
    };


    // A function that clears all data from Async storage. Not currently in use.
    // Parameters: None
    // Returns: None
    const _clearAll = async () => {
        try {
        await AsyncStorage.clear();
        } catch (error) {
        console.log('There is an error in _clearAll');
        }
    };
    

    // A function that retrieves data from AsyncStorage and sets those values to MealTitle and MealDescription.
    // Will not return data if there is no saved value, MealTitle and MealDescription are not affected. 
    // Parameters: None
    // Returns: None
    const getData = async () => {
        try{
            const curTitle = await AsyncStorage.getItem(MONDAY_TITLE_KEY)
            const curDesc = await AsyncStorage.getItem(MONDAY_DESC_KEY)
            if (curTitle !== null) {
                setTitle(curTitle)
            
            if (curDesc !== null) {
                setDesc(curDesc)
            }   }
        }catch(e) {
            console.log('There is an error in getData.')
        };
    };
   

    // A function that clears MealTitle, both the state variable and the one saved in AsyncStorage.
    // Parameters: None
    // Returns: None
    const _clearTitle = async () => {
        try {
            await AsyncStorage.removeItem(MONDAY_TITLE_KEY)
        } catch {
            console.log('There is an error in clearTitle()')
        };
    };


    // A function that clears MealDescription, both the state variable and the one saved in AsyncStorage.
    // Parameters: None
    // Returns: None
    const _clearDesc = async () => {
        try {
            await AsyncStorage.removeItem(MONDAY_DESC_KEY)
        } catch {
            console.log('There is an error in clearDesc()')
        };
    };


    // A function that calls _clearTitle and _clearDesc and sets MealTitle and MealDescription to empty strings.
    // Parameters: None
    // Returns: None
    const doClear = () => {
        _clearTitle()
        _clearDesc()
        setTitle('')
        setDesc('')
    };


    // A function that handles the exiting of the modal. 
    // Parameters: None
    // Returns: onClose(): Sets the visibility of the modal to false which closing it.
    const doExit = () => {
        return onClose();
    };

    
    // A function that handles changing text in both the title and description sections of the modal.
    // The change is made by calling setTitle and setDesc.
    // Parameters: text: What the current input is.
    //             valueFor: The value that is meant to be changed. (MealTitle/MealDescription)
    // Rrturns: None
    const handleTextChange = (text, valueFor) => {
        if(valueFor === 'MealTitle') {
            setTitle(text)
        }
        if(valueFor === 'MealDescription') 
        setDesc(text);   
    };
    


    // Calling getData in order to load in the last saved value of MealTitle and MealDescription. 
    // ---Note--- The clear button must be used to clear data before a new meal note can be made.
    getData()

        return (
            <Modal visible={visible} animationType='slide'>
                <View style={styles.container}>
                    <Text style={styles.dayTitle}>{whatDay}'s meal</Text>

                {/* The text input fields */}
                <TextInput value={MealTitle} placeholder='Meal' style={[styles.input, styles.title]} onChangeText={(text) => handleTextChange(text, 'MealTitle')}></TextInput>
                <TextInput value={MealDescription} multiline placeholder='Notes' style={[styles.input, styles.description]} onChangeText={(text) => handleTextChange(text, 'MealDescription')}></TextInput>
            
            {/* The buttons for the user */}
            <Button title='Save Note' onPress={doSubmit} />
            <View style={styles.space}/>
            <Button title='Exit' color='gold' onPress={doExit}/>
            <View style={styles.space}/>
            <Button title='Clear Note' color='red' onPress={doClear}/>

            
                </View>
            </Modal>
        
        )
    };
    

// A style sheet containing the styles used by the text input fields.
const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        fontSize: 22,
    },
    container: {
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    title: {
        height: 50,
        margin: 20,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 25,
        marginBottom: 20

    },
    space: {
        marginTop: 20,
    },
    dayTitle: {
        alignContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default MondayMealNoteModal;