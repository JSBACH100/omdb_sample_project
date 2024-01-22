import { omdbMovieResponse } from "@/data/types";
import { PageProps } from "../../../.next/types/app/page";
import MovieDetails from "@/components/movie-details/movie-details";
import EmptyState from "@/ui/empty-state/empty-state";
import ErrorState from "@/ui/error-state/error-state";
import { DEFAULT_ERROR_STATE_MESSAGE } from "@/data/contants";

export default async function Page({ params }: PageProps) {
    const data: omdbMovieResponse = await (await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&i=${params.movieId}`)).json();
    console.log(data)

    return <>
        {!data || (data.Response === "False" && data.Error !== "Incorrect IMDb ID." ) ? <ErrorState message={DEFAULT_ERROR_STATE_MESSAGE} /> :
            data.Error === "Incorrect IMDb ID." ?
                <EmptyState message="Movie not found." /> :
                <MovieDetails movieData={data} />
        }
    </>
}