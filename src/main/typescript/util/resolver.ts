import {serverLocations} from "../properties"

const
    stylesPromises  = new Map<string, Promise<any>>(),
    modulesPromises = new Map<string, Promise<any>>()

// export const useModule = (name: string) =>
//     promisePromise(name, modulesPromises, import(`${serverLocations.modules}${name}.js`))


function promisePromise<T>(promiseName: string,
                           promiseContainer: Map<string, Promise<any>>,
                           promise: Promise<T>): Promise<T>{

    if(!promiseContainer.has(promiseName))
        promiseContainer.set(promiseName, promise)

    return promiseContainer.get(promiseName) ?? promise
}

