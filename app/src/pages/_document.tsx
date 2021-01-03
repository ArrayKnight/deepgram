import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'

export default class extends Document {
    public static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const styleSheet = new ServerStyleSheet()

        try {
            const initialProps = await Document.getInitialProps({
                ...ctx,
                renderPage: () =>
                    ctx.renderPage({
                        enhanceApp: (App) => (props) =>
                            styleSheet.collectStyles(<App {...props} />),
                    }),
            })

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        />
                        {styleSheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            styleSheet.seal()
        }
    }
}
