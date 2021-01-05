import { Maybe, TrackInsertInput, TracksQuery } from '~/graphql'

export interface CreateTracksProps {
    albums: TracksQuery['albums']
    onCreateTrack: (track: TrackInsertInput) => void
}

export interface CreateTracksState {
    open: boolean
    albumId: string
    file: Maybe<File>
}
