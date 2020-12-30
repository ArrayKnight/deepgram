import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { v4 as uuid } from 'uuid'

import { User, UserFieldsArgs, UserInput, UsersFieldsArgs } from '../schemas'
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

    @Mutation(() => User)
    async upsertUser(
        @Arg('user') { name, email, image }: UserInput,
    ): Promise<User> {
        const user = await this.userService.getOne({ email })

        if (user) {
            if (user.name !== name || user.image !== image) {
                return await this.userService.update(user)
            }

            return user
        }

        return await this.userService.insert({
            id: uuid(),
            name,
            email,
            image,
        })
    }
}
