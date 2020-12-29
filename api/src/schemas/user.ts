import { Field, ID, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class User {
    @Field(() => ID)
    id: string

    @Field({ nullable: true })
    name?: string

    @Field()
    email: string

    @Field({ nullable: true })
    image?: string
}

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    email: string
}
