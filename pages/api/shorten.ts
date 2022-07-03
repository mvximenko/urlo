import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { redis } from '../../lib/redis';

type Data = {
  status?: string;
  shortUrl?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { longUrl } = req.body;

  if (!longUrl || longUrl.length <= 0) {
    return res.status(400).json({ status: 'URL is not set' });
  }

  const shortUrl = nanoid(7);
  await redis.hset('links', { [shortUrl]: longUrl });

  res.status(200).json({ shortUrl });
}
