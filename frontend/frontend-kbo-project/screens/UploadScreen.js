import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as FileSystem from 'expo-file-system';

const UploadScreen = () => {
  const [fileName, setFileName] = useState(null);
  
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });
      
      if (res && res[0]) {
        setFileName(res[0].name);
        uploadFile(res[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('L’utilisateur a annulé la sélection');
      } else {
        console.error('Erreur lors de la sélection du fichier', err);
      }
    }
  };

  const uploadFile = async (file) => {
    try {
      const fileUri = file.uri;
      
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: file.name,
        type: 'text/csv',
      });

      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Succès', 'Le fichier CSV a été téléversé avec succès !');
      } else {
        Alert.alert('Erreur', 'Le téléversement a échoué.');
      }
    } catch (error) {
      console.error('Erreur lors du téléversement', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choisir un fichier CSV" onPress={pickFile} />
      {fileName && <Text>Fichier sélectionné : {fileName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UploadScreen;
