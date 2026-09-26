import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
}

export function SearchBar({ onSearch, value: externalValue }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = externalValue !== undefined ? externalValue : internalValue;

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onSearch(text);
  };

  const handleClear = () => {
    setInternalValue('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <Search size={20} color={isFocused ? '#4F46E5' : '#94A3B8'} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={currentValue}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search rooms, buildings, labs..."
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {currentValue.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearBtn} hitSlop={8}>
            <X size={16} color="#64748B" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  inputContainerFocused: {
    borderColor: '#4F46E5',
    shadowOpacity: 0.08,
    shadowColor: '#4F46E5',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    padding: 0,
  },
  clearBtn: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginLeft: 8,
  },
});
