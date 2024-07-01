import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface KeywordSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const KeywordSearch = ({ onSearch, onClear }: KeywordSearchProps): JSX.Element => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClearSearch = () => {
    setQuery('');
    onClear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={24} color="#8978A4" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search Movies"
          placeholderTextColor="#8978A4"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        {query !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
            <FontAwesome5 name="times" size={24} color="#8978A4" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F8',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#8978A4',
  },
  clearButton: {
    padding: 8,
  },
});

export default KeywordSearch;
