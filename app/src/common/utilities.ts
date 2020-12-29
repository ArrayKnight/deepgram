import { MaybeArray } from '~/types'

export function isNil(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value)
}

export function isNull(value: unknown): value is null {
    return value === null
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined
}

export function nonNilFilter<T>(array?: MaybeArray<T>): T[] {
    if (!array) {
        return []
    }

    return array.reduce((values: T[], value) => {
        if (!isNil(value)) {
            values.push(value)
        }

        return values
    }, [])
}

interface RandomOptions {
    min?: number
    max?: number
    round?: (value: number) => number
}

export function randomInt({
    min = 0,
    max = 10,
    round = Math.round,
}: RandomOptions = {}): number {
    return Math.max(min, round(Math.random() * max))
}
