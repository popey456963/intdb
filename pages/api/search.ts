// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OeisResponse } from 'interfaces'
import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'

interface Error {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OeisResponse | Error>
) {
  const { q, start } = req.query

  if (Array.isArray(q) || q === undefined) {
    return res.status(400).json({ error: 'No query' })
  }

  const startNumber = Number(start || '0')

  if (isNaN(startNumber)) {
    return res.status(400).json({ error: 'Invalid start value' })
  }

  const data = await fetch(`https://oeis.org/search?${qs.stringify({
    q,
    start: startNumber,
    fmt: 'json',
  })}`)
    .then(res => res.json())

  res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=3600, stale-while-revalidate=86400')

  res.status(200).json(data)
}
