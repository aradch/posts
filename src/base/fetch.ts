interface IFetcherOptions {
  method: string;
  body?: string;
}

export const fetcher = async <T>(url: string, options?: IFetcherOptions): Promise<T> => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  });
};
