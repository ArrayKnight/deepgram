import { useSnackbar } from 'notistack'
import React, { memo, ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import {
    Maybe,
    useCreateUserMutation,
    User,
    UserInsertInput,
    useUserQuery,
} from '~/graphql'
import { userState } from '~/state'
import { SignUpIn } from '../SignUpIn'
import { UserRequiredProps } from './types'

export const UserRequired = memo(
    ({ children }: UserRequiredProps): ReactElement => {
        const { enqueueSnackbar } = useSnackbar()
        const [signedInUser, setUserState] = useRecoilState(userState)
        const [
            createUser,
            { data: created, error: createError, loading: createLoading },
        ] = useCreateUserMutation()
        const [createdUser, setCreatedUser] = useState<Maybe<User>>(null)
        const [queriedUser, setQueriedUser] = useState<Maybe<User>>(null)
        const [signInEmail, setSignInEmail] = useState('')
        const {
            data: queried,
            error: queryError,
            loading: queryLoading,
        } = useUserQuery({
            skip: !signInEmail,
            variables: { email: signInEmail },
        })

        function signUp(user: UserInsertInput): void {
            void createUser({ variables: { user } })
        }

        function signIn(email: string): void {
            setSignInEmail(email)
        }

        useEffect(() => {
            if (created?.user) {
                setCreatedUser(created.user)
            }
        }, [setCreatedUser, created])

        useEffect(() => {
            if (queried?.user) {
                setQueriedUser(queried.user)
            }
        }, [setQueriedUser, queried])

        useEffect(() => {
            if (queriedUser) {
                setUserState(queriedUser)
            } else if (createdUser) {
                setUserState(createdUser)
            }

            setCreatedUser(null)
            setQueriedUser(null)
            setSignInEmail('')
        }, [setUserState, createdUser, queriedUser])

        useEffect(() => {
            if (createError || queryError) {
                enqueueSnackbar(createError || queryError, { variant: 'error' })
            }

            if (createLoading || queryLoading) {
                enqueueSnackbar('Loading...')
            }
        }, [
            enqueueSnackbar,
            createError,
            createLoading,
            queryError,
            queryLoading,
        ])

        return (
            <>
                {children}
                <SignUpIn
                    user={signedInUser}
                    onSignUp={signUp}
                    onSignIn={signIn}
                />
            </>
        )
    },
)

UserRequired.displayName = 'UserRequired'
