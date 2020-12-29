import { Field, ID, ObjectType, ArgsType } from 'type-graphql'

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

@ArgsType()
export class UsersFieldsArgs {
    @Field(() => [String], { nullable: true })
    id?: string | string[]

    @Field(() => [String], { nullable: true })
    name?: string | string[]

    @Field(() => [String], { nullable: true })
    email?: string | string[]
}

@ArgsType()
export class UserFieldsArgs {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    email?: string
}
