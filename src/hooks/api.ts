export const useServer = () => {
  const response = reactive({
    error: null as any,
    loading: false as boolean,
    status: null as number | null,
  });
  const makeResponse = (
    error: any,
    loading: boolean,
    status: number | null
  ) => {
    Object.assign(response, { error:error, loading:loading, status:status });
  };
  const request = reactive({
    get: async (url: string) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
        await useFetch(url, { refetch: true }).get();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },

    post: async (url: string, body: any) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
        await useFetch(url, {
          method: "POST",
          body: JSON.stringify(body),
        }).json();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
    put: async (url: string, body: any) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
       await useFetch(url, {
          method: "PUT",
          body: JSON.stringify(body),
        }).json();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
        return unref(data);
    },
    delete: async (url: string) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
      await   useFetch(url, {
          method: "DELETE",
        }).json();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
    upload: async (url: string, body: File) => {
      const formdata = new FormData();
      formdata.append("file", body);
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
      await   useFetch(url, {
          method: "POST",
          body: formdata,
        }).json();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
    download: async (url: string) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
      await   useFetch(url, {
          method: "GET",
        }).blob();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
    text: async (url: string) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
      await  useFetch(url, {
          method: "GET",
        }).text();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
    stream: async (url: string) => {
      const { data, error, abort, statusCode, isFetching, canAbort, execute } =
      await  useFetch(url, {
          method: "GET",
        }).arrayBuffer();
      makeResponse(
        unref(error),
        unref(isFetching),
        unref(statusCode)
      );
      return unref(data);
    },
  });

  watchEffect(() => {
    if (response.error) {
      console.log("response.error", response.error);
    }
    if (response.status) {
      console.log("response.status", response.status);
    }
    if (response.loading) {
      console.log("response.loading", response.loading);
    }
  });

  return {
    response,
    request,
  };
};
