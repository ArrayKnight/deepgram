import Datastore from 'nedb-promises'

export const users = Datastore.create({
    filename: 'src/databases/users.json',
    autoload: true,
    timestampData: true,
})

export const albums = Datastore.create({
    filename: 'src/databases/albums.json',
    autoload: true,
    timestampData: true,
})

export const tracks = Datastore.create({
    filename: 'src/databases/tracks.json',
    autoload: true,
    timestampData: true,
})
