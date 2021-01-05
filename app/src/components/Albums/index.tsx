import { Button, Fab, Modal, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { format, parseISO } from 'date-fns'
import MaterialTable from 'material-table'
import React, {
    memo,
    ReactElement,
    MouseEvent,
    useState,
    ChangeEvent,
} from 'react'
import { string } from 'yup'

import { Preface } from '../Preface'
import { TableContainer, ModalBox, ModalContent } from './styled'
import { AlbumsProps } from './types'

export * as AlbumsStyled from './styled'
export * from './types'

const schema = string().matches(
    /[a-z ]*/i,
    'Only alphanumeric characters and spaces are allowed',
)

export const Albums = memo(
    ({
        loading,
        albums,
        onAlbumClick,
        onCreateAlbum,
    }: AlbumsProps): ReactElement => {
        const [state, setState] = useState({
            open: false,
            name: {
                value: '',
                error: '',
            },
        })

        function toggleOpen(): void {
            setState((prev) => ({
                ...prev,
                open: !prev.open,
            }))
        }

        function updateName(event: ChangeEvent<HTMLInputElement>): void {
            const value = event.target.value
            let error = ''

            try {
                schema.validateSync(value.trim())
            } catch (err) {
                error = (err as Error).message
            }

            setState((prev) => ({
                ...prev,
                name: {
                    value,
                    error,
                },
            }))
        }

        function submit(): void {
            onCreateAlbum({
                name: state.name.value.trim(),
            })

            setState({
                open: false,
                name: {
                    value: '',
                    error: '',
                },
            })
        }

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
                    <Fab color="secondary" size="small" onClick={toggleOpen}>
                        <Add />
                    </Fab>
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
                <Modal
                    open={state.open}
                    disableAutoFocus={true}
                    aria-labelledby="Create Album"
                    aria-describedby="Album creation form"
                    onClose={toggleOpen}
                >
                    <ModalBox>
                        <ModalContent>
                            <TextField
                                autoFocus={true}
                                label="Name"
                                required={true}
                                type="text"
                                variant="outlined"
                                error={!!state.name.error}
                                value={state.name.value}
                                helperText={state.name.error}
                                onChange={updateName}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!state.name.value.trim()}
                                onClick={submit}
                            >
                                Create
                            </Button>
                        </ModalContent>
                    </ModalBox>
                </Modal>
            </>
        )
    },
)

Albums.displayName = 'Albums'
