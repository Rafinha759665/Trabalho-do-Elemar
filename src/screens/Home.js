import React, { useEffect, useState } from "react";
import { FlatList, Button, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../services/supabase";

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const { data, error } = await supabase.from("tarefas").select("*");
    if (error) {
      console.error(error.message);
    } else {
      setTasks(data || []);
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from("tarefas").delete().eq("id", id);
    if (error) Alert.alert("Erro", "Não foi possível excluir");
    else loadTasks();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>
      <View style={{ marginBottom: 15 }}>
        <Button title="Nova Tarefa" onPress={() => navigation.navigate("CreateTask")} color="#4CAF50" />
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.título}</Text>
              <Text style={{ color: '#666' }}>{item.descrição}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: '#FF5252', fontWeight: 'bold' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#F5F5F5' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { 
    padding: 15, 
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 2 // Sombra no Android
  },
  taskTitle: { fontWeight: 'bold', fontSize: 18, color: '#000' }
});