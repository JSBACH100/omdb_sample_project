export type omdbSearchResponse = {
    Search: MovieItem[];
    totalResults: string;
    Response: string;
    Error: string;
}

export type omdbMovieResponse = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error: string;
}

export type MovieItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export type Rating = {
    Source: string;
    Value: string;
}

export type MovieOverviewProps = {
    children: React.ReactNode;
    defaultMovieSearchTitle: string;
    defaultMovies: MovieItem[] | null;
    defaultTotalResults: string;
}