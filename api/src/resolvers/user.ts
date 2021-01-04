import {
    Arg,
    Args,
    FieldResolver,
    ID,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql'

import {
    User,
    UserFieldsArgs,
    UserInsertInput,
    UsersFieldsArgs,
} from '../schemas'
import { UserService } from '../services'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    // Fields
    @FieldResolver(() => ID)
    id(@Root() user: User): string {
        return user._id
    }

    // Mutations
    @Mutation(() => User)
    async insertUser(
        @Arg('user') { name, email, image }: UserInsertInput,
    ): Promise<User> {
        const user = await this.userService.getOne({ email })

        if (user) {
            throw new Error('User with this email is already registered')
        }

        return await this.userService.insert({
            name,
            email,
            image,
        })
    }

    // Queries
    @Query(() => [User])
    async users(@Args() fields: UsersFieldsArgs): Promise<User[]> {
        return await this.userService.getMany(fields)
    }

    @Query(() => User, { nullable: true })
    async user(@Args() fields: UserFieldsArgs): Promise<User | null> {
        return await this.userService.getOne(fields)
    }
}
