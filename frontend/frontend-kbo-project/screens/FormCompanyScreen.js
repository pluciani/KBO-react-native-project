import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: `Numéro d'entreprise`, value: 'Num' },
  { label: `Nom d'entreprise`, value: 'Nom' },
  { label: `Activité`, value: 'Act' },
  { label: `Adresse`, value: 'Adr' },
];

const FormCompanyScreen = () => {
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>

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
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (

          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        
        )}
      />

      <TextInput style={styles.textInput}/>

      <Button title='Valider' color={"#2a7cb2"}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
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

  }
});

export default FormCompanyScreen;
