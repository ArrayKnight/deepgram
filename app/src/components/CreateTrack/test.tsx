import {
    cleanup,
    fireEvent,
    getByRole,
    getNodeText,
    RenderResult,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { v4 as uuid } from 'uuid'

import { render } from '~/test'
import { CreateTrack, CreateTracksProps, CREATE_TRACK_TEST_IDS } from '.'
import { loremIpsum } from 'lorem-ipsum'
import { randomInt } from '~/common'

describe('CreateTrack', () => {
    afterEach(cleanup)

    function setup({
        albums = new Array(randomInt({ min: 1 })).fill(null).map(() => ({
            __typename: 'Album',
            id: uuid(),
            name: loremIpsum({
                units: 'words',
                count: randomInt({ min: 1, max: 3 }),
            }),
        })),
        onCreateTrack = jest.fn(),
        ...rest
    }: Partial<CreateTracksProps> = {}): RenderResult & {
        props: CreateTracksProps
        openModal: () => void
    } {
        const result = render(
            <CreateTrack
                albums={albums}
                onCreateTrack={onCreateTrack}
                {...rest}
            />,
        )

        return {
            ...result,
            props: {
                albums,
                onCreateTrack,
                ...rest,
            },
            openModal: () =>
                fireEvent.click(
                    result.getByTestId(CREATE_TRACK_TEST_IDS.trigger),
                ),
        }
    }

    it('should render', () => {
        const { queryByTestId } = setup()

        expect(queryByTestId(CREATE_TRACK_TEST_IDS.trigger)).toBeInTheDocument()
        expect(
            queryByTestId(CREATE_TRACK_TEST_IDS.modal),
        ).not.toBeInTheDocument()
    })

    it('should open the modal on click of the trigger', () => {
        const { queryByTestId, openModal } = setup()

        openModal()

        expect(queryByTestId(CREATE_TRACK_TEST_IDS.modal)).toBeInTheDocument()
    })

    it('should provide album select options from props', () => {
        const {
            getByTestId,
            queryAllByTestId,
            props: { albums },
            openModal,
        } = setup()

        openModal()

        fireEvent.mouseDown(
            getByRole(getByTestId(CREATE_TRACK_TEST_IDS.albumSelect), 'button'),
        )

        expect(
            queryAllByTestId(CREATE_TRACK_TEST_IDS.albumOption),
        ).toHaveLength(albums.length)
    })

    it('should present selected file as removable chip', () => {
        const { getByTestId, openModal } = setup()
        const file = new File([], 'foo.bar')

        openModal()

        fireEvent.change(getByTestId(CREATE_TRACK_TEST_IDS.fileInput), {
            target: {
                files: [file],
            },
        })

        const fileChip = getByTestId(CREATE_TRACK_TEST_IDS.fileChip)

        expect(fileChip).toBeInTheDocument()
        expect(getNodeText(fileChip.children.item(0) as HTMLElement)).toEqual(
            file.name,
        )
    })

    it('should only submit with a complete and valid form', () => {
        const {
            getAllByTestId,
            getByTestId,
            props: { albums, onCreateTrack },
            openModal,
        } = setup()
        const file = new File([], 'foo.bar')

        openModal()

        const submit = getByTestId(CREATE_TRACK_TEST_IDS.submit)

        fireEvent.click(submit)

        expect(onCreateTrack).not.toHaveBeenCalled()

        fireEvent.mouseDown(
            getByRole(getByTestId(CREATE_TRACK_TEST_IDS.albumSelect), 'button'),
        )

        fireEvent.click(getAllByTestId(CREATE_TRACK_TEST_IDS.albumOption)[0])

        fireEvent.click(submit)

        expect(onCreateTrack).not.toHaveBeenCalled()

        fireEvent.change(getByTestId(CREATE_TRACK_TEST_IDS.fileInput), {
            target: {
                files: [file],
            },
        })

        fireEvent.click(submit)

        expect(onCreateTrack).toHaveBeenCalledWith({
            albumId: albums[0].id,
            file,
        })
    })
})
