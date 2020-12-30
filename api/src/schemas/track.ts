import { ArgsType, Field, Int, ObjectType } from 'type-graphql'

import { Document } from '../types'

@ObjectType()
export class Track implements Document {
    _id: string
    createdAt?: Date
    updatedAt?: Date
    uploadedBy: string

    @Field()
    albumId: string

    @Field()
    fileName: string

    @Field()
    fileType: string

    @Field(() => Int)
    fileSize: number

    @Field()
    duration: number
}

@ArgsType()
export class TracksFieldsArgs {
    @Field(() => [String], { nullable: true })
    id?: string | string[]

    @Field(() => [String], { nullable: true })
    uploadedBy?: string | string[]

    @Field(() => [String], { nullable: true })
    albumId?: string | string[]

    @Field(() => [String], { nullable: true })
    fileName?: string | string[]
}

@ArgsType()
export class TracksFiltersArgs {
    @Field({ nullable: true })
    maxDuration?: number
}

@ArgsType()
export class TrackFieldsArgs {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    uploadedBy?: string

    @Field({ nullable: true })
    albumId?: string

    @Field({ nullable: true })
    fileName?: string
}
