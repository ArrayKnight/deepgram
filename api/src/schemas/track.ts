import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { ArgsType, Field, InputType, Int, ObjectType } from 'type-graphql'

import { Document } from '../types'

@ObjectType()
export class Track implements Document {
    _id: string
    createdAt?: Date
    updatedAt?: Date
    uploadedBy: string
    albumId: string

    @Field()
    assetName: string

    @Field()
    fileName: string

    @Field()
    mimeType: string

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

@InputType()
export class TrackInsertInput {
    @Field()
    albumId: string

    @Field(() => GraphQLUpload)
    file: Promise<FileUpload>
}
