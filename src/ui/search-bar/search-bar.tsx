"use client";

import styles from "../search-bar/search-bar.module.scss"
import { useEffect, useState, KeyboardEvent } from "react";

export default function SearchBar({ defaultMovieSearchTitle, handleSearch }: { defaultMovieSearchTitle: string, handleSearch: (searchString: string) => void }) {

    const [searchString, setSearchString] = useState(defaultMovieSearchTitle);

    const onEnterPressed = (ev: KeyboardEvent<HTMLInputElement>) => {
        ev.stopPropagation();
        if (ev.key === "Enter") {
            const searchStringTrimmed = searchString.trim();
            if (searchStringTrimmed) {
            handleSearch(searchStringTrimmed);
            }
        }
    }

    const onChangeSearchString = (searchString: string) => {
        setSearchString(searchString);
    }
    
    return <div className={styles.search_bar}>
        <input type="text" placeholder="Search movie titles.." value={decodeURI(searchString)} onChange={(ev) => onChangeSearchString(ev.target.value)} onKeyDown={onEnterPressed} />
    </div>
}