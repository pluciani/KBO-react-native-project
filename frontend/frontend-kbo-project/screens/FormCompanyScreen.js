import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'; // Optional si tu comptes l'utiliser plus tard.
import CompanyInfoBox from '../components/companyInfoBox/CompanyInfoBox';

const data = [
  { label: `Numéro d'entreprise`, value: 'Num' },
  { label: `Nom d'entreprise`, value: 'Nom' },
  { label: `Activité`, value: 'Act' },
  { label: `Adresse`, value: 'Adr' },
];

const FormCompanyScreen = () => {
  const [categorie, setCategorie] = useState(null);
  const [value, setValue] = useState(null);

  const [resultApi, setResultApi] = useState(null);

  const search = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/searchEntreprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        },
        body: JSON.stringify({
          cat: 'cat',
          value: '418144729'
        }),
      });
  
      const responseText = await response.text();
      console.log('Réponse brute:', responseText);
  
      try {
        setResultApi(JSON.parse(responseText));
      } catch (err) {
        console.error('Erreur de parsing JSON:', err.message);
      }
  
    } catch (error) {
      console.error('Erreur:', error.message);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={categorie}
          onChange={item => {
            setCategorie(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />

        <TextInput 
          value={value} 
          onChangeText={(e) => setValue(e)} 
          style={styles.textInput} 
        />

        <Button title='Valider' onPress={search} color={"#2a7cb2"} />
      </View>
      
      {
        resultApi &&
        <View style={styles.result}>
          <CompanyInfoBox name={"nom"} companyNumber={resultApi.value} address={resultApi.phoneNumber} />
          {/* <CompanyInfoBox name={"name"} companyNumber={"companyNumber"} address={"address"} /> */}
        </View>
      }
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 200,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput: {
    width: 250,
    borderWidth: 0.3,
    padding: 5,
    backgroundColor:'#0000',
  },
});

export default FormCompanyScreen;
