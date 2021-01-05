import { AlbumInsertInput } from '~/graphql'

export interface CreateAlbumsProps {
    onCreateAlbum: (album: AlbumInsertInput) => void
}
