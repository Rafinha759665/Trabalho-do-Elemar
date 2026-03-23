import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';

export default function App() {
  // Estados para guardar o texto e controlar o carregamento
  const [conselho, setConselho] = useState<string>('Buscando sabedoria...');
  const [carregando, setCarregando] = useState<boolean>(false);

  // Função principal para buscar e traduzir o conselho
  const buscarConselho = async () => {
    setCarregando(true);
    try {
      // 1. Busca o conselho original em Inglês
      const resposta = await fetch('https://api.adviceslip.com/advice');
      const dados = await resposta.json();
      const textoIngles = dados.slip.advice;

      // 2. Envia para o motor do Google Tradutor (versão gratuita)
      const urlGoogle = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(textoIngles)}`;
      const resGoogle = await fetch(urlGoogle);
      const dadosGoogle = await resGoogle.json();
      
      // 3. Pega o texto traduzido e limpo
      const textoTraduzido = dadosGoogle[0][0][0];
      setConselho(textoTraduzido);

    } catch (erro) {
      setConselho("Erro na conexão. Verifique o Wi-Fi!");
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  // Executa assim que o app abre pela primeira vez
  useEffect(() => {
    buscarConselho();
  }, []);

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>✨</Text>
          
          {/* Se estiver carregando, mostra o círculo; se não, mostra o texto */}
          {carregando ? (
            <ActivityIndicator size="large" color="#BB86FC" style={{ marginBottom: 20 }} />
          ) : (
            <Text style={styles.textoFrase}>"{conselho}"</Text>
          )}
          
          <TouchableOpacity 
            style={[styles.botao, carregando && { opacity: 0.5 }]} 
            onPress={buscarConselho}
            disabled={carregando}
          >
            <Text style={styles.textoBotao}>Nova Motivação</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'rgba(30, 30, 30, 0.85)', padding: 40, borderRadius: 25, width: '100%', alignItems: 'center' },
  emoji: { fontSize: 50, marginBottom: 20 },
  textoFrase: { fontSize: 22, color: '#FFFFFF', textAlign: 'center', fontStyle: 'italic', marginBottom: 30 },
  botao: { backgroundColor: '#BB86FC', paddingVertical: 15, paddingHorizontal: 35, borderRadius: 50 },
  textoBotao: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});