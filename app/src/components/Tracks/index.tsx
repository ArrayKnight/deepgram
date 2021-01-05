import { IconButton } from '@material-ui/core'
import { GetApp, Speaker } from '@material-ui/icons'
import { format, parseISO } from 'date-fns'
import MaterialTable from 'material-table'
import React, { memo, ReactElement, MouseEvent } from 'react'

import { CreateTrack } from '../CreateTrack'
import { Preface } from '../Preface'
import { TableContainer } from './styled'
import { TracksProps } from './types'

export * as TracksStyled from './styled'
export * from './types'

export const Tracks = memo(
    ({
        loading,
        albums,
        tracks,
        onTrackClick,
        onCreateTrack,
        onDownloadTrack,
    }: TracksProps): ReactElement => {
        function TrackRowActions(
            track: TracksProps['tracks'][number],
        ): ReactElement {
            return (
                <>
                    <IconButton
                        href={`static/${track.assetName}`}
                        target="_blank"
                    >
                        <Speaker />
                    </IconButton>
                    <IconButton onClick={() => onDownloadTrack(track)}>
                        <GetApp />
                    </IconButton>
                </>
            )
        }

        function onRowClick(
            event?: MouseEvent,
            track?: TracksProps['tracks'][number],
        ): void {
            if (track) {
                onTrackClick(track)
            }
        }

        return (
            <>
                <Preface title="Tracks">
                    <CreateTrack
                        albums={albums}
                        onCreateTrack={onCreateTrack}
                    />
                </Preface>
                <TableContainer maxWidth="xl">
                    <MaterialTable
                        isLoading={loading}
                        columns={[
                            { title: 'File Name', field: 'fileName' },
                            {
                                title: 'Uploaded By',
                                field: 'uploadedBy.name',
                            },
                            {
                                title: 'Uploaded At',
                                field: 'createdAt',
                                type: 'datetime',
                                render: ({ createdAt }) =>
                                    createdAt
                                        ? format(
                                              parseISO(createdAt),
                                              'MM/dd/yyyy',
                                          )
                                        : null,
                            },
                            {
                                title: 'Album',
                                field: 'album.name',
                            },
                            {
                                title: 'Size (bytes)',
                                field: 'fileSize',
                                type: 'numeric',
                            },
                            {
                                title: 'Duration (seconds)',
                                field: 'duration',
                                type: 'numeric',
                            },
                            {
                                title: 'Actions',
                                disableClick: true,
                                filtering: false,
                                sorting: false,
                                type: 'numeric', // For alignment
                                render: TrackRowActions,
                            },
                        ]}
                        data={tracks.map((track) => ({ ...track }))}
                        options={{
                            draggable: false,
                            emptyRowsWhenPaging: false,
                            pageSize: 10,
                            pageSizeOptions: [],
                            toolbar: false,
                        }}
                        onRowClick={onRowClick}
                    />
                </TableContainer>
            </>
        )
    },
)

Tracks.displayName = 'Tracks'
