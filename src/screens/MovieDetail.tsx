import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from '../components/movies/MovieList'
const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    fetchMovieDetails()
  }, [])

  const fetchMovieDetails = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.releaseDate}>{movie.release_date}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </View>
      <MovieList
        title="Recommendations"
        path={`movie/${id}/recommendations`}
        coverType="poster"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  poster: {
    width: 100,
    height: 160,
    borderRadius: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  overview: {
    fontSize: 16,
  },
})

export default MovieDetail
