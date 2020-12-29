import { Service } from 'typedi'

import { convertFieldsArgsToQuery, isNil } from '../common'
import { tracks } from '../databases'
import {
    Track,
    TrackFieldsArgs,
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
}
