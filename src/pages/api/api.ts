import { handleOnRouteApiCallPost } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  const body = req?.body !== '' ? JSON.parse(req?.body) : null;
  const endPoint = req.query.url ?? '';
  const cookies = parseCookies({ req });

  const dynamicHeader = {
    Authorization: `Bearer ${cookies?.embro_token}` || ``,
    // language: cookies?.language ?? `en`,
    // currency: cookies?.currency ?? `USD`,
    // type: 3,
    // currency: 'INR'
  };

  try {
    if (requestMethod === 'POST') {
      const { isError, response } = await handleOnRouteApiCallPost({
        body: body,
        dynamicHeader: dynamicHeader,
        endPoint: endPoint,
      });

      if (!isError) {
        return res.status(200).json({ isError: false, response: response });
      }
      return res.status(500).json({ isError: true, response: response });
    }
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err }),
    };
  }
};

export default handler;
