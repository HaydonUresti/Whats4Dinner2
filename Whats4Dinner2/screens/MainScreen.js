import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Modal} from 'react-native';
import MondayMealNoteModal from '../components/MondayMealNoteModal';
import TuesdayMealNoteModal from '../components/TuesdayNoteModal';
import WednesdayMealNoteModal from '../components/WednesdayMealNoteModal';
import ThursdayMealNoteModal from '../components/ThursdayMealNoteModal';
import FridayMealNoteModal from '../components/FridayMealNoteModal';
import SaturdayMealNoteModal from '../components/SaturdayMealNoteModal';
import SundayMealNoteModal from '../components/SundayMealNoteModal';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'


// The funciton that contains the main screen of the app with its functions.
//Parameters: None
//Returns: The tags and components of the main screen.
function MainScreen() {
 

 // Declaring state to set the visibility of the modals (A modal is the note pop-up)
 // They are initially set to false so that the modals do not immediately appear on screen.
 const [MondayModalVisible, mondaySetModalVisible] = useState(false);
 const [TuesdayModalVisible, tuesdaySetModalVisible] = useState(false)
 const [WednesdayModalVisible, wednesdaySetModalVisible] = useState(false)
 const [ThursdayModalVisible, thursdaySetModalVisible] = useState(false)
 const [FridayModalVisible, fridaySetModalVisible] = useState(false)
 const [SaturdayModalVisible, saturdaySetModalVisible] = useState(false)
 const [SundayModalVisible, sundaySetModalVisible] = useState(false)

// Declaring state to hold the value of the day that was selected.
 const [dayUsed, setModalDay] = useState('')
 

 const submitMeal = (whatDay, MealTitle, MealDescription) => {
   console.log("The day being saved: " + whatDay + "The title of the meal: " + MealTitle + "The description: " + MealDescription);
 };
  
  // Creating the navigation tool to handle changing screens
  const navigation = useNavigation()
  
  // A function that handles the signing out of the user's account
 const doSignOut = () => {
    auth
    .signOut()
    .then(() => {
      // Changing the screen to the Login screen
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  return (
    

    <View style={styles.container}>
     

      <View style={[styles.container, {backgroundColor: '#EE6C4D', flex: 0.08, justifyContent: 'center',}]}>
      <Text style={[textStyles.headline, {marginTop: 15}]}>What's 4 Dinner?</Text>
      </View>

      {/* This container holds the days of the week */}
      <View style={[styles.container, {backgroundColor: '#2E4052', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', 
      flexWrap: 'wrap', alignContent: 'center', }]}>
        


        {/* MONDAY */}
        {/* Giving SetModalVisible the value true will make the modal pop up as its visibility is set to true */}
        <TouchableHighlight onPress={() => [setModalDay('Monday') ,mondaySetModalVisible(true)]}> 
        <View
        style={ days.container }>
        <Text style={textStyles.dayName}>Monday</Text>
        </View>
        </TouchableHighlight>

        {/* TUESDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Tuesday') ,tuesdaySetModalVisible(true)]}> 
        <View style={days.container }>
          <Text style={textStyles.dayName}>Tuesday</Text>
        </View>
        </TouchableHighlight>

        {/* WEDNESDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Wednesday') ,wednesdaySetModalVisible(true)]}> 
        <View style={days.container }>
          <Text style={textStyles.dayName}>Wednesday</Text>
        </View>
       </TouchableHighlight>

        {/* THURSDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Thursday') ,thursdaySetModalVisible(true)]}> 
        <View style={days.container }>
          <Text style={textStyles.dayName}>Thursday</Text>
        </View>
        </TouchableHighlight>

        {/* FRIDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Friday') ,fridaySetModalVisible(true)]}> 
        <View style={days.container }>
          <Text style={textStyles.dayName}>Friday</Text>
        </View>
        </TouchableHighlight>

        {/* SATURDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Saturday') ,saturdaySetModalVisible(true)]}> 
        <View style={days.container }>
          <Text style={textStyles.dayName}>Saturday</Text>
        </View>
        </TouchableHighlight>

        {/* SUNDAY */}
        <TouchableHighlight onPress={() => [setModalDay('Sunday') ,sundaySetModalVisible(true)]}> 
        <View style={days.sundayContainer }>
          <Text style={textStyles.dayName}>Sunday</Text>
        </View>
        </TouchableHighlight>


      </View>
      <View style={styles.logOut}>
      <TouchableHighlight
      onPress={doSignOut}
      >
        <Text style={styles.button}>Sign Out</Text>
      </TouchableHighlight>

      </View>
      <StatusBar style="auto" />

      {/* Calling the modal and setting its visibility to false when the onClose function is called.  */}
      <MondayMealNoteModal visible={MondayModalVisible} whatDay={dayUsed} onClose={() => mondaySetModalVisible(false)} onSubmit={submitMeal}/>
      <TuesdayMealNoteModal visible={TuesdayModalVisible} whatDay={dayUsed} onClose={() => tuesdaySetModalVisible(false)} onSubmit={submitMeal}/>
      <WednesdayMealNoteModal visible={WednesdayModalVisible} whatDay={dayUsed} onClose={() => wednesdaySetModalVisible(false)} onSubmit={submitMeal}/>
      <ThursdayMealNoteModal visible={ThursdayModalVisible} whatDay={dayUsed} onClose={() => thursdaySetModalVisible(false)} onSubmit={submitMeal}/>
      <FridayMealNoteModal visible={FridayModalVisible} whatDay={dayUsed} onClose={() => fridaySetModalVisible(false)} onSubmit={submitMeal}/>
      <SaturdayMealNoteModal visible={SaturdayModalVisible} whatDay={dayUsed} onClose={() => saturdaySetModalVisible(false)} onSubmit={submitMeal}/>
      <SundayMealNoteModal visible={SundayModalVisible} whatDay={dayUsed} onClose={() => sundaySetModalVisible(false)} onSubmit={submitMeal}/>
    
    
    </View>

  );
};


// A style sheet defining the styles used by the day containers. 
const days = StyleSheet.create({
  container:  {
    width: 80,
    height: 50,
    backgroundColor: '#FFC857',
    margin: 10
  },
  sundayContainer: {
    width: 110,
    height: 50,
    backgroundColor: '#FFC857',
    margin: 10
  }
});


// A style sheet defining the styles used generally by containers.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logOut: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E4052',
  },
  button: {
    fontWeight: 'bold'
  }
});

// A style sheet defining the styles affecting text.
const textStyles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  dayName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
  
});

// The export statement allowing the MainScreen function to be called elsewhere. 
export default MainScreen;

