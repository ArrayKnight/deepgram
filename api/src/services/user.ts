import { Service } from 'typedi'

import { convertFieldsArgsToQuery } from '../common'
import { users } from '../databases'
import { User, UserFieldsArgs, UsersFieldsArgs } from '../schemas'

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

    async insert(user: Omit<User, '_id'>): Promise<User> {
        return await users.insert<Omit<User, '_id'>>(user)
    }

    async update({ _id, name, image }: User): Promise<User> {
        return await users.update<User>(
            { _id },
            { name, image },
            {
                returnUpdatedDocs: true,
            },
        )
    }
}
