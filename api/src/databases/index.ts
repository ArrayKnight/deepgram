import Datastore from 'nedb-promises'
import type { DataStoreOptions } from 'nedb'

const options: DataStoreOptions = {
    autoload: true,
    timestampData: true,
    corruptAlertThreshold: 1,
}

export const users = Datastore.create({
    filename: 'src/databases/users.json',
    ...options,
})

export const albums = Datastore.create({
    filename: 'src/databases/albums.json',
    ...options,
})

export const tracks = Datastore.create({
    filename: 'src/databases/tracks.json',
    ...options,
})
