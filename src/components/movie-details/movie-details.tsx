import { omdbMovieResponse } from '@/data/types';
import MovieCover from './movie-cover/movie-cover';
import styles from './movie-details.module.scss';
import MovieInfo from './movie-info/movie-info';
import BackButton from '@/ui/back-button/back-button';
import { MovieRatings } from './movie-info/movie-ratings/movie-ratings';
import { Suspense } from 'react';

export default function MovieDetails({ movieData }: { movieData: omdbMovieResponse }) {
    return <Suspense fallback={<div>Loading movie details...</div>}>
        <section className={styles.movie_header_container}>
            <BackButton path={"/"} />
            <h1>{movieData.Title}</h1>
        </section>
        <section className={styles.movie_details_container}>
            <section className={styles.movie_cover_container}>
                <MovieCover coverUrl={movieData.Poster} title={movieData.Title} />
            </section>
            <section className={styles.movie_info_container}>
                <MovieInfo movieData={movieData} />
            </section>
        </section>
        <section className={styles.movie_rating_container}>
            <MovieRatings movieData={movieData} />
        </section>
    </Suspense>
}