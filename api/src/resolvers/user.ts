import { Args, Query, Resolver } from 'type-graphql'

import { User, UserFieldsArgs, UsersFieldsArgs } from '../schemas'
import { UserService } from '../services'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User])
    async users(@Args() fields: UsersFieldsArgs): Promise<User[]> {
        return await this.userService.getMany(fields)
    }

    @Query(() => User, { nullable: true })
    async user(@Args() fields: UserFieldsArgs): Promise<User | null> {
        return await this.userService.getOne(fields)
    }
}
