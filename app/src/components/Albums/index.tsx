import { format, parseISO } from 'date-fns'
import MaterialTable from 'material-table'
import React, { memo, ReactElement, MouseEvent } from 'react'

import { Root } from './styled'
import { AlbumsProps } from './types'

export * as AlbumsStyled from './styled'
export * from './types'

export const Albums = memo(
    ({ albums, onAlbumClick }: AlbumsProps): ReactElement => {
        function onRowClick(
            event?: MouseEvent,
            album?: AlbumsProps['albums'][number],
        ): void {
            if (album) {
                onAlbumClick(album)
            }
        }

        return (
            <Root maxWidth="xl">
                <MaterialTable
                    columns={[
                        { title: 'Name', field: 'name' },
                        {
                            title: 'Owner',
                            field: 'createdBy.name',
                        },
                        {
                            title: 'Created',
                            field: 'createdAt',
                            type: 'datetime',
                            render: ({ createdAt }) =>
                                createdAt
                                    ? format(parseISO(createdAt), 'MM/dd/yyyy')
                                    : null,
                        },
                    ]}
                    data={albums}
                    options={{
                        draggable: false,
                        emptyRowsWhenPaging: false,
                        pageSize: 10,
                        pageSizeOptions: [],
                        toolbar: false,
                    }}
                    onRowClick={onRowClick}
                />
            </Root>
        )
    },
)

Albums.displayName = 'Albums'
