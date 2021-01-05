import { Button, Fab, Modal, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { ChangeEvent, memo, ReactElement, useState } from 'react'
import { string } from 'yup'

import { ModalBox, ModalContent } from './styled'
import { CreateAlbumsProps } from './types'

export * as CreateAlbumStyled from './styled'
export * from './types'

const schema = string().matches(
    /[a-z ]*/i,
    'Only alphanumeric characters and spaces are allowed',
)

export const CreateAlbum = memo(
    ({ onCreateAlbum }: CreateAlbumsProps): ReactElement => {
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

        return (
            <>
                <Fab color="secondary" size="small" onClick={toggleOpen}>
                    <Add />
                </Fab>
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

CreateAlbum.displayName = 'CreateAlbum'
