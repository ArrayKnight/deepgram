import { Maybe, TrackInsertInput, TracksQuery } from '~/graphql'

export interface TracksProps {
    loading: boolean
    albums: TracksQuery['albums']
    tracks: TracksQuery['tracks']
    onTrackClick: (track: TracksQuery['tracks'][number]) => void
    onCreateTrack: (track: TrackInsertInput) => void
    onDownloadTrack: (track: TracksQuery['tracks'][number]) => void
}

export interface TracksState {
    open: boolean
    albumId: string
    file: Maybe<File>
}
