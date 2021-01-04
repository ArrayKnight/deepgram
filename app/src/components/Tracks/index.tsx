import {
    Button,
    Chip,
    Fab,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
} from '@material-ui/core'
import { Add, AttachFile, GetApp, Speaker } from '@material-ui/icons'
import { format, parseISO } from 'date-fns'
import MaterialTable from 'material-table'
import React, {
    createRef,
    memo,
    ReactElement,
    MouseEvent,
    useState,
    ChangeEvent,
} from 'react'
import { v4 as uuid } from 'uuid'

import { Preface } from '../Preface'
import { TableContainer, ModalBox, ModalContent, FileInput } from './styled'
import { TracksProps, TracksState } from './types'

export * as TracksStyled from './styled'
export * from './types'

export const Tracks = memo(
    ({
        albums,
        tracks,
        onTrackClick,
        onCreateTrack,
        onDownloadTrack,
    }: TracksProps): ReactElement => {
        const fileInputRef = createRef<HTMLInputElement>()
        const [state, setState] = useState<TracksState>({
            open: false,
            albumId: '',
            file: null,
        })
        const selectId = uuid()

        function toggleOpen(): void {
            setState((prev) => ({
                ...prev,
                open: !prev.open,
            }))
        }

        function selectAlbum(
            event: ChangeEvent<{ name?: string; value: unknown }>,
        ): void {
            setState((prev) => ({
                ...prev,
                albumId: `${event.target.value}`,
            }))
        }

        function selectFile(event: ChangeEvent<HTMLInputElement>): void {
            const [file] = Array.from(event.target.files || new FileList())

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }

            if (file) {
                setState((prev) => ({
                    ...prev,
                    file,
                }))
            }
        }

        function removeFile(): void {
            setState((prev) => ({
                ...prev,
                file: null,
            }))
        }

        function onFileSelectClick(): void {
            fileInputRef.current?.click()
        }

        function submit(): void {
            if (state.albumId && state.file) {
                onCreateTrack({
                    albumId: state.albumId,
                    file: state.file,
                })

                setState({
                    open: false,
                    albumId: '',
                    file: null,
                })
            }
        }

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
                    <Fab color="secondary" size="small" onClick={toggleOpen}>
                        <Add />
                    </Fab>
                </Preface>
                <TableContainer maxWidth="xl">
                    <MaterialTable
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
                <Modal
                    open={state.open}
                    disableAutoFocus={true}
                    aria-labelledby="Create Track"
                    aria-describedby="Track creation form"
                    onClose={toggleOpen}
                >
                    <ModalBox>
                        <ModalContent>
                            <FormControl required={true} variant="outlined">
                                <InputLabel htmlFor={selectId}>
                                    Album
                                </InputLabel>
                                <Select
                                    inputProps={{ id: selectId }}
                                    label="Album"
                                    value={state.albumId}
                                    onChange={selectAlbum}
                                >
                                    {albums.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl required={true}>
                                {state.file && (
                                    <Chip
                                        label={state.file.name}
                                        onDelete={removeFile}
                                    />
                                )}
                                <FileInput
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    required={true}
                                    onChange={selectFile}
                                />
                                <Button
                                    color="default"
                                    endIcon={<AttachFile />}
                                    onClick={onFileSelectClick}
                                >
                                    Select Audio File
                                </Button>
                            </FormControl>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!state.albumId || !state.file}
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

Tracks.displayName = 'Tracks'
