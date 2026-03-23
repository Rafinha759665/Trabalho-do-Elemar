import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { supabase } from "../services/supabase";

export default function CreateTask({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSave() {
    if (!titulo) return Alert.alert("Aviso", "O título é obrigatório");

    // Lembre-se: no seu banco as colunas são 'título' e 'descrição'
    const { error } = await supabase
      .from("tarefas")
      .insert([{ título: titulo, descrição: descricao }]);

    if (error) {
      Alert.alert("Erro", "Erro ao salvar no banco");
    } else {
      Alert.alert("Sucesso", "Tarefa criada!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova Tarefa</Text>
      
      <Text style={styles.label}>Título</Text>
      <TextInput 
        style={styles.input} 
        value={titulo} 
        onChangeText={setTitulo} 
        placeholder="O que precisa ser feito?" 
      />
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        value={descricao} 
        onChangeText={setDescricao} 
        placeholder="Detalhes (opcional)"
        multiline
      />
      
      <Button title="Salvar Tarefa" onPress={handleSave} color="#4CAF50" />
      <View style={{ marginTop: 10 }}>
        <Button title="Voltar" color="#999" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    marginBottom: 20, 
    padding: 12,
    fontSize: 16
  }
});