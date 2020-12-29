import { Service } from 'typedi'

import { users } from '../databases'
import { User } from '../schemas'

@Service()
export class UserService {
    async getAll(): Promise<User[]> {
        return await users.find<User>({})
    }

    async getOne(id: string): Promise<User> {
        return await users.findOne<User>({ id })
    }
}
