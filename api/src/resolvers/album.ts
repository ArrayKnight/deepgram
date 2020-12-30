import {
    Arg,
    Args,
    Ctx,
    FieldResolver,
    ID,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql'

import {
    Album,
    AlbumFieldsArgs,
    AlbumInsertInput,
    AlbumsFieldsArgs,
    Track,
    User,
} from '../schemas'
import { AlbumService, TrackService, UserService } from '../services'
import type { Context } from '../types'

@Resolver(() => Album)
export class AlbumResolver {
    constructor(
        private albumService: AlbumService,
        private trackService: TrackService,
        private userService: UserService,
    ) {}

    // Fields
    @FieldResolver(() => ID)
    id(@Root() album: Album): string {
        return album._id
    }

    @FieldResolver(() => String, { nullable: true })
    createdAt(@Root() album: Album): string | null {
        return album.createdAt ? album.createdAt.toISOString() : null
    }

    @FieldResolver(() => String, { nullable: true })
    updatedAt(@Root() album: Album): string | null {
        return album.updatedAt ? album.updatedAt.toISOString() : null
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

    // Mutations
    @Mutation(() => Album)
    async insertAlbum(
        @Arg('album') album: AlbumInsertInput,
        @Ctx() ctx: Context,
    ): Promise<Album> {
        if (!ctx.userId) {
            throw new Error('An authenticated user is required')
        }

        return await this.albumService.insert(album, ctx.userId)
    }

    // Queries
    @Query(() => [Album])
    async albums(@Args() fields: AlbumsFieldsArgs = {}): Promise<Album[]> {
        return await this.albumService.getMany(fields)
    }

    @Query(() => Album, { nullable: true })
    async album(@Args() fields: AlbumFieldsArgs): Promise<Album | null> {
        return await this.albumService.getOne(fields)
    }
}
