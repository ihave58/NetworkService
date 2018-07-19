import APIMethods from "./APIMethods";

export default class APIRequest {
    method: APIMethods;
    params: Map<string, Object>;
    // ....
    // ....

    constructor() {

    }

    getParams(): Map<string, Object> {
        return this.params;
    }
}

