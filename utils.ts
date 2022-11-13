import { IOption } from "./types";

export function filterBy<V>(options: IOption<V>[], key: string) {
    const lowerCaseKey = key.toLowerCase()
    return options.filter(opt => {
        const lowercase = String(opt.label ?? opt.value).toLowerCase();

        return lowercase.includes(lowerCaseKey)
    })
}