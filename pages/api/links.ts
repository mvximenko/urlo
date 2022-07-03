import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../../lib/redis';

type Data = {
  links: Record<string, unknown> | never[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let links = (await redis.hgetall('links')) || [];
  res.status(200).json({ links });
}
