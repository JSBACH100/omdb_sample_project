"use client"

import styles from "./movie-overview.module.scss";
import { useCallback, useEffect, useState } from "react";
import { MovieOverviewProps, MovieItem, omdbSearchResponse } from "@/data/types";
import MovieGrid from "./movie-grid/movie-grid";
import Spinner from "@/ui/spinner/spinner";
import SearchBar from "@/ui/search-bar/search-bar";
import EmptyState from "@/ui/empty-state/empty-state";
import { DEFAULT_EMPTY_STATE_MESSAGE, DEFAULT_ERROR_STATE_MESSAGE } from "@/data/contants";
import ErrorState from "@/ui/error-state/error-state";

export default function MovieOverview({ children, defaultMovieSearchTitle, defaultMovies, defaultTotalResults }: MovieOverviewProps) {

    const [deviceWidth, setDeviceWidth] = useState(0);
    const [movies, setMovies] = useState<MovieItem[] | null>(defaultMovies);
    const [searchState, setsearchState] = useState({
        currentPage: 1,
        getMore: false,
        isFirstRender: true,
        loading: false,
        movieSearchTitle: defaultMovieSearchTitle,
        totalResults: Number(defaultTotalResults)
    });

    useEffect(() => {
        // Get the viewport size on first render and add the device width and scroll to bottom listeners.
        handleUpdateViewportSize();
        window.addEventListener("resize", () => handleUpdateViewportSize);
    }, []);

    useEffect(() => {
        const handleGetMoreMovies = () => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - getScrollOffset()) {
                if (!searchState.loading && searchState.totalResults >= searchState.currentPage * 10) {
                    setsearchState((prev) => ({ ...prev, isFirstRender: false, getMore: true, loading: true }));
                }
            }
        };
        window.addEventListener('scroll', handleGetMoreMovies, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleGetMoreMovies);
        }
    }, [searchState.currentPage, searchState.loading, searchState.totalResults]);

    useEffect(() => {
        if (!searchState.isFirstRender && searchState.loading) {
            (async () => await getMovies())();
        }
    }, [searchState.loading]);

    const getMovies = async () => {
        try {
            const result: omdbSearchResponse = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&s=${searchState.movieSearchTitle}&page=${!searchState.getMore ? searchState.currentPage : searchState.currentPage + 1}`).then(res => res.json());
            console.log("result: ", result);

            // If no results were returned, add an empty array to the return object so the empty state will be displayed.
            if (result.Response === "False" && result.Error === "Movie not found!") {
                if (!searchState.getMore) {
                    // Only display the empty state if this is the initial search for the title.
                    setMovies([]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setsearchState((prev) => ({ ...prev, totalResults: 0, getMore: false, loading: false }));
                return;
            }

            // Check if there was an error fetching the movies and there is at least one movie in the array.
            if (result.Response !== "False") {
                const newMovies = movies !== null && searchState.getMore ? [...movies, ...result.Search] : result.Search;
                setMovies(newMovies);
                setsearchState((prev) => ({ ...prev, totalResults: Number(result.totalResults), currentPage: !searchState.getMore ? 1 : searchState.currentPage + 1, getMore: false, loading: false }));
                if (!searchState.getMore) window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setMovies(null);
                setsearchState((prev) => ({ ...prev, getMore: false, loading: false }))
            }
        } catch (error) {
            console.log("Error fetching movie data: ", error);
            setMovies(null);
            setsearchState((prev) => ({ ...prev, getMore: false, loading: false }))
        }
    }

    const getScrollOffset = () => {
        const OFFSET_DESKTOP = 500; const OFFSET_TABLET = 300; const OFFSET_MOBILE = 100;
        if (deviceWidth >= 1024) return OFFSET_DESKTOP;
        if (deviceWidth >= 768) return OFFSET_TABLET;
        if (deviceWidth < 768) return OFFSET_MOBILE;
        return 0;
    }

    const handleSearch = useCallback((searchString: string) => {
        if (!searchState.loading && encodeURI(searchString) !== searchState.movieSearchTitle) {
            setsearchState((prev) => ({ ...prev, isFirstRender: false, movieSearchTitle: encodeURI(searchString), currentPage: 1, loading: true }));
        }
    }, [searchState.loading]);

    const handleUpdateViewportSize = () => {
        setDeviceWidth(window.innerWidth);
    }

    return (
        <>
            <section className={styles.search_bar_container}>
                <SearchBar handleSearch={handleSearch} defaultMovieSearchTitle={defaultMovieSearchTitle} />
            </section>
            {/* Ensure that the initial fetch is server side rendered and all subsequent data fetching / interaction replaces the ssr content. */}
            <section>
                {searchState.isFirstRender ? children : movies !== null ? movies.length > 0 ? <MovieGrid movies={movies} /> : <EmptyState message={DEFAULT_EMPTY_STATE_MESSAGE} /> : <ErrorState message={DEFAULT_ERROR_STATE_MESSAGE} />}
                {searchState.loading && <Spinner />}
            </section>
        </>
    );
}