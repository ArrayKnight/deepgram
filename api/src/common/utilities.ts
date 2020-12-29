export function convertFieldsArgsToQuery(
    fields: Record<string, unknown>,
): Record<string, unknown> {
    return Object.entries(fields).reduce(
        (query: Record<string, unknown>, [key, value]) => {
            if (!isNil(value)) {
                query[key] = isArray(value) ? { $in: value } : value
            }

            return query
        },
        {},
    )
}

export function isArray(value: unknown): value is Array<unknown> {
    return Array.isArray(value)
}

export function isNil(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value)
}

export function isNull(value: unknown): value is null {
    return value === null
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined
}
