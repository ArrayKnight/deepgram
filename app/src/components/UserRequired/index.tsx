import React, { memo, ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useSignUpInMutation } from '~/graphql'
import { userState } from '~/state'
import { SignUpIn } from '../SignUpIn'
import { UserRequiredProps } from './types'

export const UserRequired = memo(
    ({ children }: UserRequiredProps): ReactElement => {
        const [loggedInUser, setUserState] = useRecoilState(userState)
        const [signUpIn, { data }] = useSignUpInMutation()

        useEffect(() => {
            setUserState(data?.user ?? null)
        }, [setUserState, data])

        return (
            <>
                {children}
                <SignUpIn
                    user={loggedInUser}
                    onSubmit={(user) => signUpIn({ variables: { user } })}
                />
            </>
        )
    },
)

UserRequired.displayName = 'UserRequired'
