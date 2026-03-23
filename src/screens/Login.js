import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>App Rodando!</Text>
      <Button title="Entrar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});