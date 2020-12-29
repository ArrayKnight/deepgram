import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Album {
    @Field(() => ID)
    id: string

    @Field()
    createdAt: string

    @Field()
    updatedAt: string

    @Field()
    createdBy: string

    @Field()
    updatedBy: string

    @Field()
    name: string
}
