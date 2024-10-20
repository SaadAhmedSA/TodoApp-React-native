import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [todoval,settodoval] = useState("")
  const [todo,settodo] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const [updatetodo, setUpdatetodo] = useState('')
  const [index, setIndex] = useState(0)

  const addtodo = ()=>{
    todo.push(todoval)
    settodo([...todo])
    settodoval('')
    
  }
  const delele = (index:number)=>{
    todo.splice(index,1)
    settodo([...todo])

  }
  const editedtodo = (index:number)=>{
    todo.splice(index,1,updatetodo)
    settodo([...todo])
    setModalVisible(false)

  }
  return (
    <SafeAreaView style={styles.container}>
    <Text style={{
        fontSize: 30,
        fontWeight:"bold",
        textAlign: 'center',
        marginVertical: 10
      }}>TodoApp</Text>
      <TextInput
        style={styles.input}
        onChangeText={settodoval}
        value={todoval}
        placeholder="Enter Todo Value"
        />
        <TouchableOpacity style={styles.button} onPress={addtodo}>
        <Text>Add todo</Text>
      </TouchableOpacity>
      {todo.length > 0 ? <FlatList
        style={{ marginTop: 20 }}
        data={todo}
        renderItem={({ item, index }) => {
          return <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
            <TouchableOpacity style={styles.ListBtn} onPress={()=>delele(index)}
              activeOpacity={0.5}
            >
              <Text>delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ListBtn} onPress={() => {
              setIndex(index)
              setUpdatetodo(item);
              setModalVisible(true)
            }}>
              <Text>edit</Text>
            </TouchableOpacity>
          </View>
        }}
        keyExtractor={(item, index) => index.toString()}
      /> : <Text style={{ ...styles.title, color: 'black', margin: 20 }}>No Todo Found...</Text>}
      
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Todo!</Text>
              <TextInput
                style={styles.updateInput}
                onChangeText={setUpdatetodo}
                value={updatetodo}
              />
              <Pressable
                style={[styles.modalBtn, styles.buttonClose]}
                onPress={() => editedtodo(index)}>
                <Text style={styles.textStyle}>Update Todo</Text>
              </Pressable>   
              <Pressable
                style={[styles.modalBtn, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </View>
  </SafeAreaView>

  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"lightgrey",
    color:"yellow",
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 150
  },
  input: {
    height: 40,
    marginHorizontal: 40,
    marginVertical: 10,
    borderWidth: 2,
    padding: 10,
  },
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center'
  },
  ListBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  updateInput: {
    margin: 20,
    width: 200,
    borderWidth: 1,
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
  modalBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    margin:10
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
})