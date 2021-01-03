import { AppBar, Button, Modal, Tab, Tabs, TextField } from '@material-ui/core'
import React, {
    ChangeEvent,
    memo,
    ReactElement,
    useMemo,
    useState,
} from 'react'
import { string } from 'yup'

import { UserUpsertInput } from '~/graphql'
import { ModalBox, ModalContent } from './styled'
import { SignUpInProps } from './types'

export * from './styled'
export * from './types'

const schemas = {
    name: string().matches(
        /[a-z ]*/i,
        'Only alphanumeric characters and spaces are allowed',
    ),
    email: string().email().required(),
    image: string().url(),
}

export const SignUpIn = memo(
    ({ user, onSubmit }: SignUpInProps): ReactElement => {
        const [tabIndex, setTabIndex] = useState(0)
        const [state, setState] = useState({
            name: {
                value: '',
                error: '',
            },
            email: {
                value: '',
                error: '',
            },
            image: {
                value: '',
                error: '',
            },
        })
        const isValid = useMemo(
            () =>
                Object.entries(state).every(([key, { value }]) => {
                    try {
                        schemas[key as keyof typeof state].validateSync(value)

                        return true
                    } catch (error) {
                        return false
                    }
                }),
            [state],
        )
        const signUp = tabIndex === 1

        function update(
            key: keyof typeof state,
        ): (event: ChangeEvent<HTMLInputElement>) => void {
            return (event: ChangeEvent<HTMLInputElement>): void => {
                const value = event.target.value
                let error = ''

                try {
                    schemas[key].validateSync(value.trim())
                } catch (err) {
                    error = (err as Error).message
                }

                setState((prev) => ({
                    ...prev,
                    [key]: {
                        value,
                        error,
                    },
                }))
            }
        }

        function submit(): void {
            onSubmit(
                Object.entries(state).reduce(
                    (acc: UserUpsertInput, [key, { value }]) => {
                        if (value.trim()) {
                            acc[key as keyof UserUpsertInput] = value.trim()
                        }

                        return acc
                    },
                    { email: '' },
                ),
            )
        }

        return (
            <Modal
                open={!user}
                disableAutoFocus={true}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                aria-labelledby="Sign up/in"
                aria-describedby="User form to sign up or in"
            >
                <ModalBox elevation={2}>
                    <AppBar color="default" elevation={0} position="static">
                        <Tabs
                            centered={true}
                            indicatorColor="primary"
                            textColor="primary"
                            value={tabIndex}
                            onChange={(_, index) => setTabIndex(index)}
                        >
                            <Tab label="Sign In" />
                            <Tab label="Sign Up" />
                        </Tabs>
                    </AppBar>
                    <ModalContent autoComplete="off" noValidate={true}>
                        {signUp && (
                            <TextField
                                label="Name"
                                type="text"
                                variant="outlined"
                                error={!!state.name.error}
                                value={state.name.value}
                                helperText={state.name.error}
                                onChange={update('name')}
                            />
                        )}
                        <TextField
                            autoFocus={true}
                            label="Email"
                            required={true}
                            type="email"
                            variant="outlined"
                            error={!!state.email.error}
                            value={state.email.value}
                            helperText={state.email.error}
                            onChange={update('email')}
                        />
                        {signUp && (
                            <TextField
                                label="Avatar"
                                type="url"
                                variant="outlined"
                                error={!!state.image.error}
                                value={state.image.value}
                                helperText={state.image.error}
                                onChange={update('image')}
                            />
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={submit}
                        >
                            Go
                        </Button>
                    </ModalContent>
                </ModalBox>
            </Modal>
        )
    },
)

SignUpIn.displayName = 'SignUpIn'
