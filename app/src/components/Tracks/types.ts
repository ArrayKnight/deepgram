import { Maybe, TrackInsertInput, TracksQuery } from '~/graphql'

export interface TracksProps {
    albums: TracksQuery['albums']
    tracks: TracksQuery['tracks']
    onTrackClick: (track: TracksQuery['tracks'][number]) => void
    onCreateTrack: (track: TrackInsertInput) => void
}

export interface TracksState {
    open: boolean
    albumId: string
    file: Maybe<File>
}
