import { AlbumsQuery } from '~/graphql'

export interface AlbumsProps {
    albums: AlbumsQuery['albums']
    onAlbumClick: (album: AlbumsQuery['albums'][number]) => void
}
