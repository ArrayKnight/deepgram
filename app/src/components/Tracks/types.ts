import { TracksQuery } from '~/graphql'

import { CreateTracksProps } from '../CreateTrack'

export interface TracksProps extends CreateTracksProps {
    loading: boolean
    tracks: TracksQuery['tracks']
    onTrackClick: (track: TracksQuery['tracks'][number]) => void
    onDownloadTrack: (track: TracksQuery['tracks'][number]) => void
}
