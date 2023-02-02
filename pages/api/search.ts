// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OeisResponse, searchOrderOptions } from 'interfaces'
import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'

interface Error {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, start, sort } = req.query

  if (Array.isArray(q) || q === undefined) {
    return res.status(400).json({ error: 'No query' })
  }

  if (sort && (Array.isArray(sort) || !Object.keys(searchOrderOptions).includes(sort))) {
    return res.status(400).json({ error: 'Invalid sort' })
  }

  const startNumber = Number(start || '0')

  if (isNaN(startNumber)) {
    return res.status(400).json({ error: 'Invalid start value' })
  }

  res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=3600, stale-while-revalidate=86400')

  const data = await fetch(`https://oeis.org/search?${qs.stringify({
    q,
    sort,
    start: startNumber,
    fmt: 'json',
  })}`)
    .then(res => res.arrayBuffer())

  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  
  res.send(Buffer.from(data))
}
