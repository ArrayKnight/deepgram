import { Service } from 'typedi'

import { convertFieldsArgsToQuery } from '../common'
import { users } from '../databases'
import {
    User,
    UserFieldsArgs,
    UsersFieldsArgs,
    UserInsertInput,
} from '../schemas'

@Service()
export class UserService {
    async getMany(fields: UsersFieldsArgs = {}): Promise<User[]> {
        const query = convertFieldsArgsToQuery({ ...fields })

        return await users.find<User>(query)
    }

    async getOne(fields: UserFieldsArgs = {}): Promise<User | null> {
        if (Object.keys(fields).length === 0) {
            throw new Error('At least one constraint must be provided')
        }

        const query = convertFieldsArgsToQuery({ ...fields })

        return await users.findOne<User>(query)
    }

    async insert(user: UserInsertInput): Promise<User> {
        return await users.insert<UserInsertInput>(user)
    }

    async update(id: User['_id'], user: User): Promise<User> {
        return await users.update<User>({ _id: id }, user, {
            returnUpdatedDocs: true,
        })
    }
}
