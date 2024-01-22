export default function MovieCover({ coverUrl, title}: {coverUrl: string, title: string} ) {
    return <img src={coverUrl} alt={title} />
}