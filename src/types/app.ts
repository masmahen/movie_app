export interface MovieListProps {
  title: string
  path: string
  coverType: 'poster' | 'backdrop'
  movies?: Movie[]
}

export interface Movie {
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number; // Tambahkan properti ini
  vote_count: number;
}


export interface MovieItemProps {
  movie: Movie
  size: { width: number; height: number }
  coverType: 'poster' | 'backdrop'
}


