import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql'

import {
    Track,
    TrackFieldsArgs,
    TracksFieldsArgs,
    TracksFiltersArgs,
    User,
} from '../schemas'
import { TrackService, UserService } from '../services'

@Resolver(() => Track)
export class TrackResolver {
    constructor(
        private trackService: TrackService,
        private userService: UserService,
    ) {}

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

    @FieldResolver(() => User, { nullable: true })
    async uploadedBy(@Root() track: Track): Promise<User | null> {
        return await this.userService.getOne({ id: track.uploadedBy })
    }
}
