import APIMethods from "./APIMethods";
import UrlBuilder from "../urlBuilder";

export default class APIRequest {
    method: APIMethods;
    url: string;
    params: Map<string, Object>;
    // ....
    // ....

    constructor(params) {
        this.params = params;
    }

    getParams(): Map<string, Object> {
        return this.params;
    }

    toString(): string {
        const urlBuilder = new UrlBuilder(this.url, this.getParams());

        return urlBuilder.toString();
    }
}

