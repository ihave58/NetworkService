class UrlBuilder {
    url: string = "";
    params: Map<string, Object> = new Map();

    constructor(url: string, params: Map<string, Object>) {
        this.addUrl(url);
        this.addParams(params);
    }

    addUrl(url: string): UrlBuilder {
        this.url = url;

        return this;
    }

    addParam(key: string, value: Object): UrlBuilder {
        this.params.set(key, value);

        return this;
    }

    addParams(params: Map<string, Object> = new Map()): UrlBuilder {
        params.forEach((value, key) => {
            this.addParam(key, value);
        });

        return this;
    }

    toString(): string {
        return `${this.url}${this.toSearchString()}`;
    }

    toSearchString(): string {
        let paramsString = [];

        this.params.forEach((value, key) => {
            paramsString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        });

        return `?${paramsString.join("&")}`;
    }

    static getParam(key): Object {
        return (new URLSearchParams(window.location.search)).get(key);
    }
}

export default UrlBuilder;
