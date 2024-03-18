import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { pad } from "../core/utils";

export default function ObsModal({ state, source, showModal, setModal, setButton}) {

    return (
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
            {source?.stories?.[pad(state.story)]?.frames.map((value, key) => <Pressable key={key} style={[styles.button, styles.buttonClose]} onPress={() => setButton(2, 3)}><Text style={styles.textStyle}>{`${key+1}`}</Text></Pressable>)}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(!showModal)}>
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
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
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