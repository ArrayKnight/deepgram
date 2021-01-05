import { AlbumsQuery } from '~/graphql'

import { CreateAlbumsProps } from '../CreateAlbum'

export interface AlbumsProps extends CreateAlbumsProps {
    loading: boolean
    albums: AlbumsQuery['albums']
    onAlbumClick: (album: AlbumsQuery['albums'][number]) => void
}
