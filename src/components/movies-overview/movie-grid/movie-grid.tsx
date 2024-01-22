import Link from "next/link";
import style from "./movie-grid.module.scss";
import { MovieItem } from "@/data/types";

export default function MovieGrid({ movies }: { movies: MovieItem[] }) {

    return <section className={style.grid}>
        {movies.map((movie, index) => {
            return <div className={style.movie_item} key={index}>
                <Link href={`/${movie.imdbID}`} >
                    {/* In order to use a fallback image here, a custom react component can be made that keeps track of in the image was rendered on the server if not. */}
                    {/* If not, the class will keep track of a fallback was already attempted to avoid infinite looping. */}
                    <img src={movie.Poster} alt={movie.Title} />
                </Link>
            </div>
        })}
    </section>
}