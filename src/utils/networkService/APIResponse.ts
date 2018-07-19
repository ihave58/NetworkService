import APIRequest from "./APIRequest";
import NetworkService from "./networkService";

let Id = 0;

export default class APIResponse {
    private readonly promise: Promise;

    private onResolve: Function;
    private onReject: Function;

    readonly responseId: number = Id++;
    readonly request: APIRequest;
    isAborted: Boolean = false;

    // You shall not be able to instantiate APIResponse without a Network request promise in hand
    constructor(requestPromise: Promise, request: APIRequest) {
        this.request = request;
        this.promise = requestPromise;
    }

    abort(callback): Boolean {
        this.isAborted = true;

        return NetworkService
            .abort(this.responseId, callback);
    }

    then(resolve: Function, reject?: Function) {
        this.onResolve = resolve;
        this.onReject = reject;

        this.promise.then(this.onPromiseResolve, this.onPromiseReject);
    }

    catch(callback) {
        return this.promise.catch(callback);
    }

    private onPromiseResolve(response: Object): Promise {
        if (this.isAborted) {
            console.info("Aborted APIResponse:", response);
        } else {
            this.onResolve(response);
        }

        return this.promise;
    }

    private onPromiseReject(response: Object): Promise {
        if (this.isAborted) {
            console.error("Aborted APIResponse:", response);
        } else {
            this.onReject(response);
        }

        return this.promise;
    }
}
