import { AlbumInsertInput, AlbumsQuery } from '~/graphql'

export interface AlbumsProps {
    loading: boolean
    albums: AlbumsQuery['albums']
    onAlbumClick: (album: AlbumsQuery['albums'][number]) => void
    onCreateAlbum: (album: AlbumInsertInput) => void
}
