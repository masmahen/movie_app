import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';

interface Genre {
  id: number;
  name: string;
}

interface CategorySearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const CategorySearch = ({ onSearch, onClear }: CategorySearchProps): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
        headers: {
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handleSearch = () => {
    if (selectedGenre) {
      onSearch(selectedGenre.id.toString());
    } else {
      onClear();
    }
  };

  const handleClearSearch = () => {
    setSelectedGenre(null);
    onClear();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.genreButton, selectedGenre === null && styles.selectedGenreButton]}
          onPress={handleClearSearch}
        >
          <Text style={[styles.genreButtonText, selectedGenre === null && styles.selectedGenreButtonText]}>All</Text>
        </TouchableOpacity>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[styles.genreButton, selectedGenre?.id === genre.id && styles.selectedGenreButton]}
            onPress={() => handleGenreSelect(genre)}
          >
            <Text style={[styles.genreButtonText, selectedGenre?.id === genre.id && styles.selectedGenreButtonText]}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  genreButton: {
    backgroundColor: '#F5F7F8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  selectedGenreButton: {
    backgroundColor: '#8978A4',
  },
  genreButtonText: {
    fontSize: 16,
    color: '#8978A4',
  },
  selectedGenreButtonText: {
    color: '#FFFFFF',
  },
  searchButton: {
    backgroundColor: '#8978A4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CategorySearch;
