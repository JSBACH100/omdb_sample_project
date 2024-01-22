import styles from './page.module.scss';
import { DEFAULT_EMPTY_STATE_MESSAGE, DEFAULT_ERROR_STATE_MESSAGE } from "../data/contants";
import { omdbSearchResponse } from '@/data/types';
import MovieOverview from '@/components/movies-overview/movies-overview';
import MovieGrid from '@/components/movies-overview/movie-grid/movie-grid';
import EmptyState from "../components/../ui/empty-state/empty-state";
import { Suspense } from 'react';
import ErrorState from '@/ui/error-state/error-state';

export default async function Home() {

  const DEFAULT_SEARCH_TITLE: string = encodeURI("star wars");

  const getDefaultMovies = async () => {

    try {
      const result: omdbSearchResponse = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&s=${DEFAULT_SEARCH_TITLE}`).then(res => res.json());

      // If no results were returned, add an empty array to the return object so the empty state will be displayed.
      if (result.Response === "False" && result.Error === "Movie not found!") {
        result.Search = [];
        result.totalResults = "0";
        return result;
      }

      return result.Response !== "False" ? result : null;
    } catch (error) {
      console.error("Error fetching default movies: ", error);
      return null;
    }
  }

  const data: omdbSearchResponse | null = await getDefaultMovies();

  return (
    <main className={styles.main}>
      <Suspense fallback={<p>Loading movies...</p>}>
        <MovieOverview defaultMovies={data !== null ? data.Search : null} defaultMovieSearchTitle={DEFAULT_SEARCH_TITLE} defaultTotalResults={data !== null ? data.totalResults : "0"}>
          {/* If the data was fetched successfully, display the movie grid if results are not empty, otherwise display the empty state. */}
          {data !== null ? data.Search.length > 0 ? <MovieGrid movies={data.Search} /> : <EmptyState message={ DEFAULT_EMPTY_STATE_MESSAGE}/> : <ErrorState message={DEFAULT_ERROR_STATE_MESSAGE} />}
        </MovieOverview>
      </Suspense>
    </main>
  )
}