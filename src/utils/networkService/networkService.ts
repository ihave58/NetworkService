import APIRequest from "./APIRequest";
import APIResponse from "./APIResponse";
import xhr from "xhr-async";

class NetworkService {
    private static mapToFetchParams(request: APIRequest): Object {
        return {
            method: request.method,
            url: request.toString()
            // ...
            // ...
            // construct and map the requestParams to fetchParams format.
        };
    }

    private static fetch(request: APIRequest): Promise {
        const fetchParams = this.mapToFetchParams(request);

        return xhr(fetchParams);
    }

    public static abort(id: number, callback?: Function): any {
        return xhr
            .abort(id)
            .then(callback);
    }

    public static makeRequest(request: APIRequest): APIResponse {
        const requestPromise = this.fetch(request);

        return new APIResponse(requestPromise, request);
    }
}

export default NetworkService;
