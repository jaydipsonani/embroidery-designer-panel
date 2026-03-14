import logger from '@/utils/logger';
import { getCookie } from '../useHooks/useCookies';
import { NEXT_PUBLIC_API_BASEURL } from '../constants';
import nookies, { parseCookies } from 'nookies';
import axios from 'axios';

const handleOnRemoveUserData = async () => {
  nookies.destroy(null, 'embro_token', { path: '/' });
  nookies.destroy(null, 'dist_percentage', { path: '/' });
  nookies.destroy(null, 'user_data', { path: '/' });
};

const handleOnLogOut = async () => {
  await handleOnRemoveUserData();
  window.location.href = '/auth/signin';
};

export const restBaseUrl = `${NEXT_PUBLIC_API_BASEURL}/api`;

export const restBcHeaders = {
  'content-type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${getCookie('embro_token')}`,
  // currency: 'USD',
};

export async function getRouteApi({
  method,
  body,
  endPoint,
  headers,
}: {
  method: string;
  body?: any;
  endPoint?: any;
  headers?: any;
}) {
  try {
    const json = {
      url: endPoint,
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await routeApi(queryString, config);
    if (res?.isError && res?.response?.status == 401) {
      handleOnLogOut();
      return;
    }

    return res?.response;
  } catch (err) {
    logger.error('API threw Error', err);
    throw err;
  }
}

export async function postMultipartApi({
  endPoint,
  body,
}: {
  endPoint: string;
  body: FormData;
}) {
  try {
    const config: RequestInit = {
      method: 'POST',
      body, // FormData is passed directly
    };

    const queryString = new URLSearchParams({ url: endPoint }).toString();
    const res = await routeApi(queryString, config);

    return res?.response;
  } catch (err) {
    logger.error('Multipart API threw an Error', err);
    throw err;
  }
}

export async function getApiServerside({
  context,
  endPoint,
  body,
  header,
}: {
  context?: any;
  endPoint?: string;
  body?: any;
  header?: any;
}) {
  const url = `${restBaseUrl}/${endPoint}`;
  const { req, res } = context;
  const cookies = parseCookies({ req });

  const dynamicHeader = {
    Authorization: `Bearer ${cookies?.embro_token}`,
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        ...restBcHeaders,
        ...dynamicHeader,
        ...header,
      },
    });
    return {
      isError: false,
      response: response.data,
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // setCookie({ res }, 'embro_token', '', {
      //   maxAge: -1,
      //   path: '/',
      // });

      return {
        isError: true,
        response: null,
        message: 'Request failed with status code 401',
      };
    }

    return {
      isError: true,
      response: null,
      message: error?.message || 'An error occurred while making the request',
    };
  }
}

export async function handleOnRouteApiCallPost({
  body,
  dynamicHeader,
  endPoint,
}: {
  body: any;
  dynamicHeader?: any;
  endPoint?: any;
}) {
  const url = `${restBaseUrl}/${endPoint}`;

  try {
    const response = await axios.post(url, JSON.stringify(body), {
      headers: {
        ...restBcHeaders,
        ...dynamicHeader,
      },
    });
    return {
      isError: false,
      response: response.data,
    };
  } catch (error: any) {
    console.log(
      'responseresponse++++++++++++++++++++',
      error?.response?.status
    );

    if (error?.response?.status === 401) {
      return {
        isError: true,
        response: error,
        message:
          error?.response?.message || 'Request failed with status code 401',
      };
    }

    return {
      isError: true,
      response: error,
      message:
        error?.response?.message ||
        'An error occurred while making the request',
    };
  }
}

const routeApi = async (query: string, config: any) =>
  await (await fetch(`/api/api?${query}`, config)).json();
