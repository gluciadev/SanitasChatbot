import { axiosClient } from "./axiosClient";

function resolveBaseUrl(apiEndpoint?: string, apiVersion?: string) {
  const base = apiEndpoint ?? (process.env.NEXT_PUBLIC_API_BASEURL || "");
  const version = apiVersion ? `/${apiVersion}` : "";
  return `${base}${version}`;
}

/** GET */
export async function getCall<T, R = T, D = unknown>(
  url: string,
  apiEndpoint?: string,
  apiVersion?: string
): Promise<R> {
  const fullUrl = `${resolveBaseUrl(apiEndpoint, apiVersion)}${url}`;
  const resp = await axiosClient.get<R, R, D>(fullUrl);
  return resp;
}

/** POST */
export async function postCall<T, R = T, D = unknown>(
  url: string,
  data?: D,
  apiEndpoint?: string,
  apiVersion?: string
): Promise<R> {
  const fullUrl = `${resolveBaseUrl(apiEndpoint, apiVersion)}${url}`;
  const resp = await axiosClient.post<R, R, D>(fullUrl, data);
  return resp;
}

/** PUT */
export async function putCall<T, R = T, D = unknown>(
  url: string,
  data?: D,
  apiEndpoint?: string,
  apiVersion?: string
): Promise<R> {
  const fullUrl = `${resolveBaseUrl(apiEndpoint, apiVersion)}${url}`;
  const resp = await axiosClient.put<R, R, D>(fullUrl, data);
  return resp;
}

/** DELETE */
export async function deleteCall<T, R = T, D = unknown>(
  url: string,
  apiEndpoint?: string,
  apiVersion?: string
): Promise<R> {
  const fullUrl = `${resolveBaseUrl(apiEndpoint, apiVersion)}${url}`;
  const resp = await axiosClient.delete<R, R, D>(fullUrl);
  return resp;
}



/* EN CASO DE QUERER AÑADIR DECORATORS SE HARIA A ESTE NIVEL POR EJEMPLO: 

axiosClient.get<R, R, D>(fullUrl) ---> axiosClient.get<R, R, D>(fullUrl, withLocaleHeaders(config))


*/