import { Service } from 'typedi'

import { albums } from '../databases'
import { Album } from '../schemas'

@Service()
export class AlbumService {
    async getAll(): Promise<Album[]> {
        return await albums.find<Album>({})
    }

    async getOne(id: string): Promise<Album> {
        return await albums.findOne<Album>({ id })
    }
}
