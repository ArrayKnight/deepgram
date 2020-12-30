import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

import { Document } from '../types'

@ObjectType()
export class Album implements Document {
    _id: string
    createdAt?: Date
    updatedAt?: Date
    createdBy: string

    @Field()
    name: string
}

@ArgsType()
export class AlbumsFieldsArgs {
    @Field(() => [String], { nullable: true })
    id?: string | string[]

    @Field(() => [String], { nullable: true })
    createdBy?: string | string[]

    @Field(() => [String], { nullable: true })
    name?: string | string[]
}

@ArgsType()
export class AlbumFieldsArgs {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    createdBy?: string

    @Field({ nullable: true })
    name?: string
}

@InputType()
export class AlbumInsertInput {
    @Field()
    name: string
}

@InputType()
export class AlbumUpdateInput {
    @Field()
    id: string

    @Field()
    name: string
}

@InputType()
export class AlbumRemoveInput {
    @Field()
    id: string
}
