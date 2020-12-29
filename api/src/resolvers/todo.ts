import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { v4 as uuid } from 'uuid'

import { Todo, TodoInput } from '../schemas'

@Resolver(() => Todo)
export class TodoResolver {
    private _todos: Todo[] = []

    @Query(() => [Todo], { nullable: true })
    async todos(): Promise<Todo[]> {
        return await Promise.resolve(this._todos)
    }

    @Mutation(() => Todo)
    async addTodo(
        @Arg('todoInput') { title, description }: TodoInput,
    ): Promise<Todo> {
        const todo = {
            id: uuid(),
            title,
            description,
            status: false,
        }

        await Promise.resolve(this._todos.push(todo))

        return todo
    }
}
