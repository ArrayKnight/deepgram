import {
    Button,
    Chip,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
} from '@material-ui/core'
import { Add, AttachFile } from '@material-ui/icons'
import React, {
    ChangeEvent,
    createRef,
    memo,
    ReactElement,
    useState,
} from 'react'
import { v4 as uuid } from 'uuid'

import { FileInput, ModalBox, ModalContent } from './styled'
import { CreateTracksProps, CreateTracksState } from './types'

export * as CreateTracksStyled from './styled'
export * from './types'

export const CREATE_TRACK_TEST_IDS = Object.freeze({
    trigger: 'CreateTrackTrigger',
    modal: 'CreateTrackModal',
    albumSelect: 'CreateTrackAlbumSelect',
    albumOption: 'CreateTrackAlbumOption',
    fileChip: 'CreateTrackFileChip',
    fileInput: 'CreateTrackFileInput',
    submit: 'CreateTrackSubmit',
})

export const CreateTrack = memo(
    ({ albums, onCreateTrack }: CreateTracksProps): ReactElement => {
        const fileInputRef = createRef<HTMLInputElement>()
        const [state, setState] = useState<CreateTracksState>({
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

        return (
            <>
                <Fab
                    color="secondary"
                    size="small"
                    onClick={toggleOpen}
                    data-testid={CREATE_TRACK_TEST_IDS.trigger}
                >
                    <Add />
                </Fab>
                <Modal
                    open={state.open}
                    disableAutoFocus={true}
                    aria-labelledby="Create Track"
                    aria-describedby="Track creation form"
                    onClose={toggleOpen}
                    data-testid={CREATE_TRACK_TEST_IDS.modal}
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
                                    data-testid={
                                        CREATE_TRACK_TEST_IDS.albumSelect
                                    }
                                >
                                    {albums.map(({ id, name }) => (
                                        <MenuItem
                                            key={id}
                                            value={id}
                                            data-testid={
                                                CREATE_TRACK_TEST_IDS.albumOption
                                            }
                                        >
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
                                        data-testid={
                                            CREATE_TRACK_TEST_IDS.fileChip
                                        }
                                    />
                                )}
                                <FileInput
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    required={true}
                                    onChange={selectFile}
                                    data-testid={
                                        CREATE_TRACK_TEST_IDS.fileInput
                                    }
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
                                data-testid={CREATE_TRACK_TEST_IDS.submit}
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

CreateTrack.displayName = 'CreateTrack'
