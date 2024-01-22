import { omdbMovieResponse } from "@/data/types"
import styles from "./movie-info.module.scss"

export default function MovieInfo({ movieData }: { movieData: omdbMovieResponse }) {
    return <>
        <section className={styles.movie_info}>
            <p>Genre: {movieData.Genre}</p>
            <p>Released: {movieData.Released}</p>
            <p>Runtime: {movieData.Runtime}</p>
            <p>{movieData.Language} - {movieData.Country}</p>
            <p>Director: {movieData.Director}</p>
            <p>Writer(s): {movieData.Writer}</p>
            <p>Cast: {movieData.Actors}</p>
            <p>Description:</p>
            <p>{movieData.Plot}</p>
            <p>Awards: {movieData.Awards}</p>
            <p>Box office: {movieData.BoxOffice}</p>
        </section>
    </>
}