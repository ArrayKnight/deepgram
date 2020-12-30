import { Args, FieldResolver, ID, Query, Resolver, Root } from 'type-graphql'

import {
    Album,
    AlbumFieldsArgs,
    AlbumsFieldsArgs,
    Track,
    User,
} from '../schemas'
import { AlbumService, TrackService, UserService } from '../services'

@Resolver(() => Album)
export class AlbumResolver {
    constructor(
        private albumService: AlbumService,
        private trackService: TrackService,
        private userService: UserService,
    ) {}

    @FieldResolver(() => ID)
    id(@Root() album: Album): string {
        return album._id
    }

    @FieldResolver(() => User, { nullable: true })
    async createdBy(@Root() album: Album): Promise<User | null> {
        return await this.userService.getOne({ id: album.createdBy })
    }

    @FieldResolver(() => [User])
    async modifiedBy(@Root() album: Album): Promise<User[]> {
        const tracks = await this.tracks(album)
        const userIds = [
            album.createdBy,
            ...tracks.map((track) => track.uploadedBy),
        ]

        return await this.userService.getMany({ id: userIds })
    }

    @FieldResolver(() => [Track])
    async tracks(@Root() album: Album): Promise<Track[]> {
        return await this.trackService.getMany({ albumId: album._id })
    }

    @Query(() => [Album])
    async albums(@Args() fields: AlbumsFieldsArgs = {}): Promise<Album[]> {
        return await this.albumService.getMany(fields)
    }

    @Query(() => Album, { nullable: true })
    async album(@Args() fields: AlbumFieldsArgs): Promise<Album | null> {
        return await this.albumService.getOne(fields)
    }
}
