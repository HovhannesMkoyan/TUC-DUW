declare namespace WebdriverIO {
  interface Browser {
    setupInterceptor: () => void;
    /**
     * Returns all intercepted Sensic tracking requests since browser.setupInterceptor() was called that optionally match a set of parameters.
     *
     * @param withParams Optional parameters object to filter the requests, like { ty: "I" }
     */
    getTrackingRequests(withParams?: object): TrackingRequest[];
    /**
     * Returns the latest intercepted Sensic tracking request since browser.setupInterceptor() was called that optionally matches a set of parameters.
     *
     * @param withParams Optional parameters object to filter the request, like { ty: "I" }
     */
    getLastTrackingRequest(withParams?: object): TrackingRequest;
    /**
     * Waits until a Sensic tracking request that optionally matches a set of parameters was intercepted.
     *
     * @param withParams Optional parameters object to match the request, like { ty: "I" }
     * @param options waitUntil options
     */
    waitForTrackingRequest(withParams?: object, options?: any): TrackingRequest;
    waitForTrackingRequests(
      withParams?: Partial<TrackingRequest>[],
      options?: any
    ): TrackingRequest[];
  }
}

declare namespace WdioInterceptorService {
  type HTTPMethod =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";
  interface InterceptedRequest {
    url: string;
    method: HTTPMethod;
    body: string | object;
    headers: object;
    response: {
      headers: object;
      body: string | object;
      statusCode: number;
    };
  }
}
