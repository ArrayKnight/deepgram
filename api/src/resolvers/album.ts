import { Query, Resolver } from 'type-graphql'

import { Album } from '../schemas'
import { AlbumService } from '../services'

@Resolver(() => Album)
export class AlbumResolver {
    constructor(private albumService: AlbumService) {}

    @Query(() => [Album!]!)
    async albums(): Promise<Album[]> {
        return await this.albumService.getAll()
    }
}
