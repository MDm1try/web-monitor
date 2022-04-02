import { ApiError } from "./error";

async function parseBody(res) {
  const contentType = res.headers.get(`Content-Type`);
  if (!contentType || contentType.startsWith(`text/`)) {
    return { text: await res.text() };
  }
  return res.json();
}

async function createHeaders() {
  const headers = new Headers({
    "Content-Type": `application/json`,
    Accept: `application/json`,
  });

  return headers;
}

function checkStatusCode(res, body) {
  if (res.ok) {
    return;
  }

  const statusMessage = res.statusText ?? `Status code ${res.status} did not indicate success`;

  if (Array.isArray(body)) {
    throw new ApiError(res.status, statusMessage);
  } else if (body.error) {
    throw new ApiError(res.status, body.error);
  } else if (body.text) {
    throw new ApiError(res.status, body.text);
  } else {
    throw new ApiError(res.status, statusMessage);
  }
}

// eslint-disable-next-line consistent-return
export default async function request(url, method, data) {
  const init = {
    method,
    headers: await createHeaders(),
  };

  if (data) {
    init.body = JSON.stringify(data);
  }
  const req = new Request(url, init);

  try {
    const res = await fetch(req);
    const body = await parseBody(res);
    checkStatusCode(res, body);

    return body;
  } catch (error) {
    throw error;
  }
}
