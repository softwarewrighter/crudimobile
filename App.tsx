import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>CrudiMobile</Text>
        <Text style={styles.subtitle}>Mobile Frontend for Crudibase</Text>
        <Text style={styles.version}>Version 0.1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    color: '#757575',
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    color: '#1976D2',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    color: '#9E9E9E',
    fontSize: 12,
    marginTop: 20,
  },
});
