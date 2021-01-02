import fs from 'fs'
import { getAudioDurationInSeconds } from 'get-audio-duration'
import { Service } from 'typedi'
import { v4 as uuid } from 'uuid'

import { convertFieldsArgsToQuery, isNil } from '../common'
import { tracks } from '../databases'
import {
    Track,
    TrackFieldsArgs,
    TrackInsertInput,
    TracksFieldsArgs,
    TracksFiltersArgs,
} from '../schemas'

@Service()
export class TrackService {
    async getMany(
        fields: TracksFieldsArgs = {},
        { maxDuration }: TracksFiltersArgs = {},
    ): Promise<Track[]> {
        const query = {
            ...convertFieldsArgsToQuery({ ...fields }),
            ...(isNil(maxDuration) ? {} : { duration: { $lte: maxDuration } }),
        }

        return await tracks.find<Track>(query)
    }

    async getOne(fields: TrackFieldsArgs = {}): Promise<Track> {
        if (Object.keys(fields).length === 0) {
            throw new Error('At least one constraint must be provided')
        }

        const query = convertFieldsArgsToQuery({ ...fields })

        return await tracks.findOne<Track>(query)
    }

    async insert(track: TrackInsertInput, creatorId: string): Promise<Track> {
        const file = await track.file
        const { filename, mimetype } = file

        if (!/^audio/.test(mimetype)) {
            throw new Error('File upload must be an audio file')
        }

        // TODO: additional checks that mimetype matches file extension

        return new Promise((resolve, reject) => {
            const fileStream = file.createReadStream()
            const assetName = `${uuid()}-${filename}`
            let fileSize = 0

            fileStream.on('data', (chunk) => (fileSize += chunk.length))
            fileStream.on('error', (error) => reject(error))
            fileStream.on('close', () => {
                if (fileSize === 0) {
                    reject(new Error('Uploaded file has no data'))
                }

                void (async () => {
                    const duration = await getAudioDurationInSeconds(fileStream)

                    if (duration === 0) {
                        reject(new Error('Uploaded file has no duration'))
                    }

                    resolve(
                        await tracks.insert({
                            albumId: track.albumId,
                            uploadedBy: creatorId,
                            assetName,
                            fileName: filename,
                            mimeType: mimetype,
                            fileSize,
                            duration,
                        }),
                    )
                })()
            })

            fileStream.pipe(fs.createWriteStream(`.src/assets/${assetName}`))
        })
    }
}
