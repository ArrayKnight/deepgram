import React, { memo, ReactElement, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { useSignUpInMutation } from '~/graphql'
import { userIdState } from '~/state'

export const SignIn = memo(
    (): ReactElement => {
        const [email, setEmail] = useState('')
        const setUserId = useSetRecoilState(userIdState)
        const [signUpIn, { data }] = useSignUpInMutation()

        useEffect(() => {
            setUserId(data?.user.id ?? null)
        }, [setUserId, data])

        return (
            <>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={() => signUpIn({ variables: { user: { email } } })}
                >
                    Go
                </button>
            </>
        )
    },
)

SignIn.displayName = 'SignIn'
