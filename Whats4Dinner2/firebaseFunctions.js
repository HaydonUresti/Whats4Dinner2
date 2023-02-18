import { useState } from 'react';
import {firebase} from './firebase'

const doCreateData = (dataToAdd) => {
    const dataRef = firebase.firestore().collection('newData');
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

export {doCreateData};