import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button} from 'react-native';
import { useState } from 'react';
import {firebase} from '../firebase'

// A method that contains the code of the pop-up modal (screen)
// Parameters: visible: Whether or not the modal is currently visible and interactive to the user.
//             onClose: This is used to hold the current value of the modal's visibility, in order to change it.
// Returns: The visual components making up the modal and the function calls usable by the user. 
const FridayMealNoteModal = ({visible, whatDay, onClose}) => {


    // Creating state to hold the values given in the meal note.
    const [MealTitle, setTitle] = useState('');
    const [MealDescription, setDesc] = useState('');

    // Setting paths to the documents being used in the firestore database.
    const titleDayReference = firebase.firestore().collection('FridayTitleData').doc('FriayTitle');
    const descriptionDayReference = firebase.firestore().collection('FridayDescriptionData').doc('FridayDescription');


    // A function that handles the creation and saving of the title and description
    // Parameters: titleDataToAdd: The title that will be saved. 
    //             descriptionDataToAdd: The description that will be saved.
    // Returns: None
    const doCreateData = (titleDataToAdd, descriptionDataToAdd) => {
        
        // Saving the title to the specified collection and document if the title is not empty
        if(titleDataToAdd && titleDataToAdd.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: titleDataToAdd,
                createdAt: timestamp
            };
            titleDayReference
                .set(data)
                .catch(error => alert(error.message))
        }

        // Saving the description to the specified collection and document if the description is not empty
        if(descriptionDataToAdd && descriptionDataToAdd.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: descriptionDataToAdd,
                createdAt: timestamp
            };
            descriptionDayReference
                .set(data)
                .catch(error => alert(error.message))
        }
    }
    
    // A function that handles the deletion of data within firestore.
    // It does so through the deletion of the document the data is stored on.
    // Parameters: None
    // Returns: None
    const doDeleteData = () => {
        
        // Deleting the title
        titleDayReference
        .delete()
        .then(() => {
            console.log('Title was successfully deleted!');})
        .catch((error) => {
        console.error('Error deleting Title: ', error);});
        
        // Deleting the description
        descriptionDayReference
        .delete()
        .then(() => {
            console.log('Description was successfully deleted!');})
        .catch((error) => {
        console.error('Error deleting Description: ', error);});

}

    // A method that handles the submission of a meal note through calling doCreateData
    // Parameters: None
    // Returns: None
    const doSubmit = () => {
        doCreateData(MealTitle, MealDescription)
    };
    
    
    // A function that retrieves saved data from firestore.
    // Parameters: None
    // Returns: None
    const getData = () => {

        // Getting and saving the title to state
        titleDayReference.get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const title = data.heading
                setTitle(title)
            } else {
                console.log("This title does not exist")
            }

        })
        .catch((error) => {
            console.error('Error getting document: ', error);
        })

         // Getting and saving the description to state
        descriptionDayReference.get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const description = data.heading
                setDesc(description)
            } else {
                console.log("This title does not exist")
            }

        })
        .catch((error) => {
            console.error('Error getting document: ', error);
        })

    };
   

    // A function that calls _clearTitle and _clearDesc and sets MealTitle and MealDescription to empty strings.
    // Parameters: None
    // Returns: None
    const doClear = () => {
        doDeleteData()
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

export default FridayMealNoteModal;