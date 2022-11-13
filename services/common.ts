import { IOption, IRequestResult } from "../types"
import { filterBy } from "../utils"

const mockData: IOption[] = [{
    label: 'apple',
    value: 'a'
}, {
    label: 'orange',
    value: 'o'
}, {
    label: 'banana',
    value: 'b'

}];

export async function sleep(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

export async function requestOptions<V>(key: string) {
    return new Promise<IRequestResult<V>>(async (resolve) => {
        await sleep(1000)
        resolve({
            data: filterBy<V>(mockData as any, key),
            pagination: {
                page: 1,
                size: 20,
                recordsTotal: 100,
            }
        })
    })
}