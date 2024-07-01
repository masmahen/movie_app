import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import type { MovieListProps, Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from './MovieItem'

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 160,
    height: 240,
  },
}

const MovieListTwoColumns = ({ title, path, coverType, movies }: MovieListProps): JSX.Element => {
  const [movieList, setMovieList] = useState<Movie[]>(movies || [])

  useEffect(() => {
    if (!movies && path) {
      getMovieList()
    }
  }, [path])

  const getMovieList = (): void => {
    const url = `https://api.themoviedb.org/3/${path}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieList(response.results)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        style={styles.movieList}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        data={movieList}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
})

export default MovieListTwoColumns
