import { post } from "../../utils/request";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

/**
 * body rules
 * {
 *  host
 *  path
 *  method
 *  headers
 *  params[if GET]
 *  data[if POST]
 * }
 */
export async function POST(request: Request) {
  const body = JSON.parse(await request.text());
  const { host, path, method, headers, params, data } = body;
  const response = await post(host, path, method, headers, params, data);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}
