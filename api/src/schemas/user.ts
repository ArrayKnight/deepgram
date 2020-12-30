import { Field, ObjectType, ArgsType, InputType } from 'type-graphql'

import { Document } from '../types'

@ObjectType()
export class User implements Document {
    _id: string

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

@InputType()
export class UserUpsertInput implements Partial<User> {
    @Field({ nullable: true })
    name?: string

    @Field()
    email: string

    @Field({ nullable: true })
    image?: string
}
