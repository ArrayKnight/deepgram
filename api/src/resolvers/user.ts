import { Query, Resolver } from 'type-graphql'

import { User } from '../schemas'
import { UserService } from '../services'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User!]!)
    async users(): Promise<User[]> {
        return await this.userService.getAll()
    }
}
