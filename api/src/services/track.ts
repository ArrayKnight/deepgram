import { Service } from 'typedi'

import { tracks } from '../databases'
import { Track } from '../schemas'

@Service()
export class TrackService {
    async getAll(): Promise<Track[]> {
        return await tracks.find<Track>({})
    }

    async getOne(id: string): Promise<Track> {
        return await tracks.findOne<Track>({ id })
    }
}
