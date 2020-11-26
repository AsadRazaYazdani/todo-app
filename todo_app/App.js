import React,{useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const App = () => {
  let [value,setValue] = useState("");
  let [todo,setTodo] = useState([]);

  let onChangeText = (value) => {
    setValue(value);
  }

  let handleAdd = () => {
    if(value){
      setTodo([...todo,value]);
      setValue("");
    }
    else{
      alert("Empty Field!");
    }
  }

  let handleDelete = (index) => {
    let newTodo = todo.filter((_,i)=>{
      return index !== i;
    });
    return newTodo;
  }

  let handleEdit = (index) => {
    let oldValue = todo.find((_,i)=>{
      return index == i;
    });
    let newTodo = todo.filter((_,i)=>{
      return index !== i;
    });
    setValue(oldValue);
    setTodo(newTodo);
  }

  const Item = ({ title,index }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{flexDirection: "row",justifyContent: "space-between"}}>
        <Text style={styles.edit} onPress={()=>handleEdit(index)}>Edit</Text>
        <TouchableOpacity onPress={()=>setTodo(handleDelete(index))}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item,index }) => (
    <Item title={item} index={index} />
  );

  return (
    <>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={value => onChangeText(value)}
        value={value}
      />
      <Button
        onPress={handleAdd}
        title="Add Todo"
        color="#841584"
      />
      <FlatList
        data={todo}
        renderItem={renderItem}
        keyExtractor={(item,i) => item+i}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#999',
    padding: 2,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 22,
  },
  edit: {
    fontSize: 15,
    color: "blue",
    marginLeft: 5
  },
  delete: {
    fontSize: 15,
    color: "red",
    marginLeft: 5
  },
});

export default App;
