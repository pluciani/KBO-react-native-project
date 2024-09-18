import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rechercheAvance}>
        <Button
          color={'#2a7cb2'}
          title="Rechercher une entreprise"
          onPress={() => navigation.navigate('InformationEntreprise')}
        />
      </View>
      <View style={styles.uploadCSV}>
        <Button
          color={"#00ba00"}
          title="Téléverser un fichier CSV"
          onPress={() => navigation.navigate('UploadCSV')}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', 
  },
  uploadCSV: {
    flex: 1,
    backgroundColor: '#8fc98f',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  rechercheAvance: {
    flex: 1,
    backgroundColor: '#AEC6CF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});

export default HomeScreen;
