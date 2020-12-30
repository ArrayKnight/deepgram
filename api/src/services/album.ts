import { Service } from 'typedi'

import { convertFieldsArgsToQuery } from '../common'
import { albums } from '../databases'
import {
    Album,
    AlbumFieldsArgs,
    AlbumInsertInput,
    AlbumsFieldsArgs,
} from '../schemas'

@Service()
export class AlbumService {
    async getMany(fields: AlbumsFieldsArgs = {}): Promise<Album[]> {
        const query = convertFieldsArgsToQuery({ ...fields })

        return await albums.find<Album>(query)
    }

    async getOne(fields: AlbumFieldsArgs = {}): Promise<Album> {
        if (Object.keys(fields).length === 0) {
            throw new Error('At least one constraint must be provided')
        }

        const query = convertFieldsArgsToQuery({ ...fields })

        return await albums.findOne<Album>(query)
    }

    async insert(album: AlbumInsertInput, creatorId: string): Promise<Album> {
        return await albums.insert({
            ...album,
            createdBy: creatorId,
        })
    }
}
