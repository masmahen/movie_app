import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import KeywordSearch from '../components/search/KeywordSearch';
import CategorySearch from '../components/search/CategorySearch';
import MovieListTwoColumns from '../components/movies/MovieListTwoColumns';

const Search = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'keyword' | 'category'>('keyword');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchType(selectedBar as 'keyword' | 'category');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderHeader = () => (
    <View>
      <View style={styles.topBarContainer}>
        {['keyword', 'category'].map((item: string, index: number) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.9}
            style={{
              ...styles.topBar,
              backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
              borderTopLeftRadius: index === 0 ? 100 : 0,
              borderBottomLeftRadius: index === 0 ? 100 : 0,
              borderTopRightRadius: index === 1 ? 100 : 0,
              borderBottomRightRadius: index === 1 ? 100 : 0,
            }}
            onPress={() => {
              setSelectedBar(item);
            }}
          >
            <Text style={styles.topBarLabel}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedBar === 'keyword' ? (
        <KeywordSearch onSearch={handleSearch} onClear={handleClearSearch} />
      ) : (
        <CategorySearch onSearch={handleSearch} onClear={handleClearSearch} />
      )}
    </View>
  );

  const renderMovieList = () => (
    <MovieListTwoColumns
      title="Search Results"
      path={`/search/movie?query=${searchQuery}`}
      coverType="poster"
    />
  );

  return (
    <FlatList
      style={styles.container}
      data={searchQuery !== '' && searchType === selectedBar ? [1] : []}
      ListHeaderComponent={renderHeader}
      renderItem={renderMovieList}
      keyExtractor={(item) => item.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});

export default Search;
