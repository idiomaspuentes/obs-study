import { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { pad } from "../core/utils";

export default function ObsModal({ reference, source, showModal, setModal, onNavigate }) {
    const [modalStory, setModalStory] = useState();
    return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: 400, width: 400 }}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModal(!showModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              { !modalStory ?
                Object.keys(source?.stories).map((value, key) => 
                      <Pressable key={key} style={[styles.button, (key+1 === reference.story) ? { backgroundColor: 'darkblue' } : styles.buttonClose]} onPress={() => {console.log(reference.story, key+1); setModalStory(key+1)}}> 
                        <Text style={styles.textStyle}>{key+1}</Text> 
                      </Pressable>
                    ) :
                source?.stories?.[pad(modalStory)]?.frames.map((value, key) => 
                  <Pressable key={key} style={[styles.button, (modalStory === reference.story) && (key+1 === reference.frame) ? { backgroundColor: 'darkblue' } : styles.buttonClose]} onPress={() => {console.log(modalStory, key+1); onNavigate(modalStory, key+1); setModal(!showModal); setModalStory(null)}}> 
                    <Text style={styles.textStyle}>{`${key+1}`}</Text> 
                  </Pressable>
                )
              }  
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModal(!showModal); setModalStory(null)}}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModal(!showModal)}>
          <Text style={styles.textStyle}>Buscar frame</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      flex: 1,
      flexDirection: 'row',
      maxWidth: '50%',
      maxHeight: '50%',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });