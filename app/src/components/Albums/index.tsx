import { format, parseISO } from 'date-fns'
import MaterialTable from 'material-table'
import React, { memo, ReactElement, MouseEvent } from 'react'

import { CreateAlbum } from '../CreateAlbum'
import { Preface } from '../Preface'
import { TableContainer } from './styled'
import { AlbumsProps } from './types'

export * as AlbumsStyled from './styled'
export * from './types'

export const Albums = memo(
    ({
        loading,
        albums,
        onAlbumClick,
        onCreateAlbum,
    }: AlbumsProps): ReactElement => {
        function onRowClick(
            event?: MouseEvent,
            album?: AlbumsProps['albums'][number],
        ): void {
            if (album) {
                onAlbumClick(album)
            }
        }

        return (
            <>
                <Preface title="Albums">
                    <CreateAlbum onCreateAlbum={onCreateAlbum} />
                </Preface>
                <TableContainer maxWidth="xl">
                    <MaterialTable
                        isLoading={loading}
                        columns={[
                            { title: 'Name', field: 'name' },
                            {
                                title: 'Created By',
                                field: 'createdBy.email',
                                render: ({ createdBy }) =>
                                    createdBy?.name || createdBy?.email,
                            },
                            {
                                title: 'Created',
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
                                title: '# of Tracks',
                                field: 'tracks.length',
                                type: 'numeric',
                            },
                        ]}
                        data={albums.map((album) => ({ ...album }))}
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

Albums.displayName = 'Albums'
