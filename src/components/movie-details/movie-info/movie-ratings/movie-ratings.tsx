"use client";

import { omdbMovieResponse } from "@/data/types";
import styles from "./movie-ratings.module.scss";
import ShowMoreButton from "@/ui/show-more-button/show-more-button";
import { useState } from "react";

export function MovieRatings({ movieData }: { movieData: omdbMovieResponse }) {

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    }

    return (
        <>
            <div className={styles.movie_rating_container}>
                <p className={styles.rating_label}>Ratings</p>
                <p className={styles.rating_item}>IMDB Rating: {movieData.imdbRating}</p>
                <p className={styles.rating_item}>Metascore: {movieData.Metascore}</p>
                {showMore && movieData.Ratings.map((rating, index) => {
                    return <p className={styles.rating_item} key={index}>{rating.Source}: {rating.Value}</p>
                }
                )}
                {!showMore && <ShowMoreButton callback={handleShowMore} />}
            </div>
        </>
    )
}