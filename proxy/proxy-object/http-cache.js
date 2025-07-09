import { PassThrough } from "stream";
import http from "http";

const cache = new Map();

const httpCacheHandler = {
  get(target, property) {
    if (property === "get") {
      return (url, callback) => {
        let getUrl;

        if (typeof url === "object") {
          getUrl = `http://${url.hostname}:${url.port ?? 80}${url.path ?? ""}`;
        } else {
          getUrl = url;
        }

        const cached = cache.get(getUrl);
        if (cached) {
          const res = new PassThrough();
          res.statusCode = cached.statusCode;
          res.headers = cached.headers;
          res.end(cached.body);
          callback(res);
          return;
        }

        target.get(url, (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            const body = Buffer.concat(chunks);
            cache.set(getUrl, {
              body,
              headers: res.headers,
              statusCode: res.statusCode,
            });
            if (typeof callback === 'function') { callback(res); }
          });
        }).on("error", (err) => {
          if (typeof callback === 'function') { callback(err); }
        });
      };
    }

    return target[property];
  },
};

const cachedHttpClient = new Proxy(http, httpCacheHandler);

export default cachedHttpClient;
