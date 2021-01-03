import { AlbumInsertInput, AlbumsQuery } from '~/graphql'

export interface AlbumsProps {
    albums: AlbumsQuery['albums']
    onAlbumClick: (album: AlbumsQuery['albums'][number]) => void
    onCreateAlbum: (album: AlbumInsertInput) => void
}
