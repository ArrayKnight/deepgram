import { Query, Resolver } from 'type-graphql'

import { Track } from '../schemas'
import { TrackService } from '../services'

@Resolver(() => Track)
export class TrackResolver {
    constructor(private trackService: TrackService) {}

    @Query(() => [Track!]!)
    async tracks(): Promise<Track[]> {
        return await this.trackService.getAll()
    }
}
