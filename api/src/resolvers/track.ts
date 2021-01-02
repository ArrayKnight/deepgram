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
    Track,
    TrackFieldsArgs,
    TrackInsertInput,
    TracksFieldsArgs,
    TracksFiltersArgs,
    User,
} from '../schemas'
import { AlbumService, TrackService, UserService } from '../services'
import { Context } from '../types'

@Resolver(() => Track)
export class TrackResolver {
    constructor(
        private albumService: AlbumService,
        private trackService: TrackService,
        private userService: UserService,
    ) {}

    // Fields
    @FieldResolver(() => ID)
    id(@Root() track: Track): string {
        return track._id
    }

    @FieldResolver(() => String, { nullable: true })
    createdAt(@Root() track: Track): string | null {
        return track.createdAt ? track.createdAt.toISOString() : null
    }

    @FieldResolver(() => String, { nullable: true })
    updatedAt(@Root() track: Track): string | null {
        return track.updatedAt ? track.updatedAt.toISOString() : null
    }

    @FieldResolver(() => User, { nullable: true })
    async uploadedBy(@Root() track: Track): Promise<User | null> {
        return await this.userService.getOne({ id: track.uploadedBy })
    }

    @FieldResolver(() => Album, { nullable: true })
    async album(@Root() track: Track): Promise<Album | null> {
        return await this.albumService.getOne({ id: track.albumId })
    }

    // Mutations
    @Mutation(() => Track)
    async insertTrack(
        @Arg('track') track: TrackInsertInput,
        @Ctx() ctx: Context,
    ): Promise<Track> {
        if (!ctx.userId) {
            throw new Error('An authenticated user is required')
        }

        return await this.trackService.insert(track, ctx.userId)
    }

    // Queries
    @Query(() => [Track])
    async tracks(
        @Args() fields: TracksFieldsArgs = {},
        @Args() filters: TracksFiltersArgs = {},
    ): Promise<Track[]> {
        return await this.trackService.getMany(fields, filters)
    }

    @Query(() => Track, { nullable: true })
    async track(@Args() fields: TrackFieldsArgs): Promise<Track | null> {
        return await this.trackService.getOne(fields)
    }
}
