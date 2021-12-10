export function getMetaDataObject(data : Record<string, string>) {
    if (data === undefined || data === null) {
        return {};
    }

    const matchPattern = /^\s*[Mm][Ee][Tt][Aa][Dd][Aa][Tt][Aa]\[[\w\-_]+\]$/;
    const extractPattern = /(?<=[Mm][Ee][Tt][Aa][Dd][Aa][Tt][Aa]\[)[\w\-_]+(?=\]\s*$)/;
    const metadata = {};

    for (const field in data) {
        if (matchPattern.test(field)) {
            const key = field.match(extractPattern);
            if (key !== null) {
                (metadata as any)[key[0]] = data[field];
            }
        }
    }

    return metadata;
}