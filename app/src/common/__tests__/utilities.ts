import { nonNilFilter } from '../utilities'

describe('nonNilFilter', () => {
    it('should return an array', () => {
        expect(nonNilFilter(null)).toEqual([])
    })

    it('should remove null and undefined values from an array', () => {
        expect(nonNilFilter([0, null, undefined, 1, false])).toEqual([
            0,
            1,
            false,
        ])
    })
})
