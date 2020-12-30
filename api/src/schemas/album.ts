import { ArgsType, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Album {
    _id: string

    @Field()
    createdAt: string

    @Field()
    updatedAt: string

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
