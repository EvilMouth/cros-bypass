import https from "https";
import querystring from "querystring";

export const post = (
  host: string,
  path: string,
  method: string,
  headers: {},
  params: {},
  body: {}
): Promise<Response> => {
//   console.log(host, path, method, headers, params, body);
  if (params) {
    path = `${path}?${querystring.stringify(params)}`;
    // console.log("encode query", path);
  }
  return new Promise<Response>((resolve, reject) => {
    const req = https.request(
      {
        hostname: host,
        path: path,
        method: method,
        headers: headers,
      },
      (res) => {
        let data = "";
        res.on("data", (d) => {
          data += d;
        });

        res.on("end", () => {
          const headers = new Headers();
          for (const [k, v] of Object.entries(res.headers)) {
            headers.set(k, v);
          }
          resolve(
            new Response(data, {
              status: res.statusCode,
              statusText: res.statusMessage,
              headers,
            })
          );
        });
      }
    );
    if (body) {
      req.write(querystring.stringify(body));
    }
    req.on("error", (e) => {
      console.error("err", e, e.message);
      reject(e);
    });
    req.end();
  });
};
