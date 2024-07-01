import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import MovieList from '../components/movies/MovieList';
import type { Movie } from '../types/app';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigations/HomeStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FavoriteStackParamList } from '../navigations/FavoriteStackNavigation';

type MovieDetailScreenProps = NativeStackScreenProps<RootStackParamList | FavoriteStackParamList, 'MovieDetail'>;

const MovieDetail = ({ route }: MovieDetailScreenProps): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    getMovieData();
  }, [id]);

  useEffect(() => {
    checkFavorite();
  }, [movie]);

  const getMovieData = async () => {
    try {
      setLoading(true);

      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      });
      const movieData = await movieResponse.json();
      setMovie(movieData);

      const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
        headers: {
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      });
      const recommendationsData = await recommendationsResponse.json();
      setRecommendations(recommendationsData.results);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('@FavoriteList');
      const favorites: Movie[] = favoritesData ? JSON.parse(favoritesData) : [];
      if (movie) {
        setIsFavorite(favorites.some((fav) => fav.id === movie.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('@FavoriteList');
      let favorites: Movie[] = favoritesData ? JSON.parse(favoritesData) : [];

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== movie?.id);
      } else {
        if (movie) {
          favorites.push(movie);
        }
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
      checkFavorite(); // Panggil checkFavorite() setelah mengubah daftar favorit
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : movie ? (
        <>
          <ImageBackground
            resizeMode="cover"
            style={styles.backdrop}
            imageStyle={styles.backdropImageStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome5 name="star" size={20} color="yellow" solid />
                <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              </View>
              <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
                {isFavorite ? (
                  <FontAwesome5 name="heart" size={24} color="red" solid />
                ) : (
                  <FontAwesome5 name="heart" size={24} color="red" regular />
                )}
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.detailContainer}>
            <ImageBackground
              resizeMode="cover"
              style={styles.poster}
              imageStyle={styles.posterImageStyle}
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.overview}>{movie.overview}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Release Date:</Text>
                <Text style={styles.value}>{movie.release_date}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vote Average:</Text>
                <Text style={styles.value}>{movie.vote_average}</Text>
              </View>
            </View>
          </View>
          <MovieList title="Recommendations" path="/popular" coverType="poster" movies={recommendations} />
        </>
      ) : (
        <Text>No movie data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdrop: {
    width: '100%',
    height: 300,
  },
  backdropImageStyle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  gradientStyle: {
    padding: 16,
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#000',
  },
  poster: {
    width: 120,
    height: 180,
    marginRight: 16,
  },
  posterImageStyle: {
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    color: 'yellow',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default MovieDetail;
