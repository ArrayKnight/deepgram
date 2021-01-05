import { Paper, Theme } from '@material-ui/core'
import { hideVisually } from 'polished'
import styled, { css, ThemeProps } from 'styled-components'

export const ModalBox = styled(Paper)`
    min-width: 300px;
    max-width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const ModalContent = styled.form(
    ({ theme }: ThemeProps<Theme>) => css`
        padding: ${theme.spacing(4)}px;
        display: flex;
        flex-direction: column;

        .MuiFormControl-root {
            margin-bottom: ${theme.spacing(2)}px;
        }

        .MuiChip-root {
            margin-bottom: ${theme.spacing(1)}px;
        }
    `,
)

export const FileInput = styled.input`
    ${hideVisually()};
`
