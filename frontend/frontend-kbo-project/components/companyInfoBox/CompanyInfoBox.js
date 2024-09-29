import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompanyInfoBox = ({ name, companyNumber, address,navigation }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('FormInformationEntreprise')}>
      <View style={styles.leftSection}>
        <Text style={[styles.info, styles.companyNumber, {fontFamily: 'lucida grande',}]}>{companyNumber}</Text>
        <Text style={[styles.info, styles.name, {fontFamily: 'lucida grande',}]}>{name}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.info, styles.address, {fontFamily: 'lucida grande',}]}>{address}</Text>
        {/* <Text style={[styles.info, styles.address, {fontFamily: 'lucida grande',}]}>{address.pays}test</Text> */}
        {/* <Text style={[styles.info, styles.address, {fontFamily: 'lucida grande',}]}>{address.ville}</Text> */}
        {/* <Text style={[styles.info, styles.address, {fontFamily: 'lucida grande',}]}>{address.codePostale}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width:'100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  info: {
    color: '#333',
  },
  companyNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
  },
  address: {
    fontSize: 14,
  },
});

export default CompanyInfoBox;
