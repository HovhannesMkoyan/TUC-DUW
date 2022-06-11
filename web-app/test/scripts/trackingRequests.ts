import { parse } from "querystring";

declare const browser: globalThis.WebdriverIO.Browser & {
  getRequests(): WdioInterceptorService.InterceptedRequest[];
};
declare global {
  interface TrackingRequest {
    ty?: string;
    sui?: string;
    [key: string]: string | string[];
  }
}

const isTrackingRequest = (
  request: WdioInterceptorService.InterceptedRequest
) =>
  request.url.match(/-(s2s|ssa)\.sensic\.net\/?$/) && request.method === "POST";

const matchObject = (subsetObj: object) => (testObj: object) =>
  Object.entries(subsetObj).every(([key, val]) => testObj[key] === val);

/**
 * Get all requests sent by the browser that are Sensic tracking requests
 * @param withParams optional filter values. The returned list will only contain requests that match all these properties
 */
export function getTrackingRequests(withParams?: object): TrackingRequest[] {
  let trackingRequests = browser
    .getRequests()
    .filter(isTrackingRequest)
    .map((request) => parse(request.body.toString()));
  if (withParams) {
    trackingRequests = trackingRequests.filter(
      withParams ? matchObject(withParams) : () => true
    );
  }
  return trackingRequests;
}
/**
 * Get the last Sensic tracking request sent by the browser
 * @param withParams optional filter values. Only look for a request that matches all these properties
 */
export function getLastTrackingRequest(withParams?: object): TrackingRequest {
  return this.getTrackingRequests(withParams).pop();
}
/**
 * Pause until a Sensic tracking request sent by the browser was executed
 * @param withParams optional filter values. Only look for a request that matches all these properties
 * @param options
 */
export function waitForTrackingRequest(
  withParams?: object,
  options?: any
): TrackingRequest {
  let lastRequest = undefined;

  browser.waitUntil(function () {
    lastRequest = this.getLastTrackingRequest(withParams);
    return lastRequest !== undefined;
  }, options);

  return lastRequest;
}

/**
 * Pause until a list of Sensic tracking requests sent by the browser were executed
 * @param withParams optional filter values. Each filter param object in the list stands for one tracking request that has to happen in that order.
 *  So if you pass [ { ty: "PL" }, { ty: "ST" }] this method will wait until a request with type PL happend, followed by a request with type ST, and then returns these two requests.
 * @param options
 * @returns the waited for requests
 */
export function waitForTrackingRequests(
  withParams?: Partial<TrackingRequest>[],
  options?: any
): TrackingRequest[] {
  const findMatchesInOrder = (interceptedRequests: TrackingRequest[]) => {
    const matched = [];
    let remaining = interceptedRequests;
    for (let expectation of withParams) {
      const i = remaining.findIndex(matchObject(expectation));
      if (i === -1) break; // Break if expectation has no match
      matched.push(remaining[i]);
      if (i + 1 >= remaining.length) break; // Break if this was the last request
      remaining = remaining.slice(i + 1);
    }

    return matched;
  };

  let matches = undefined;
  browser.waitUntil(
    () => {
      matches = findMatchesInOrder(getTrackingRequests());
      return matches.length === withParams.length;
    },
    { ...options, timeoutMsg: `Matched: ${matches}` }
  );
  return matches;
}
