import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips />
        <View style={styles.gridSpacer}>
          <BookGrid
            books={BOOKS}
            onPressBook={() => setCartCount((n) => n + 1)}
          />
        </View>
      </ScrollView>

      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((n) => n + 1)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  gridSpacer: { marginTop: 16 },
});