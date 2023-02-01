// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import zlib from 'zlib'
import util from 'util'

const deflate = util.promisify(zlib.gunzip)

interface RecentResponse {
  recent: Array<string>
}

interface Error {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecentResponse | Error>
) {
  const data = await fetch(`https://oeis.org/recent.txt`)
    .then(res => res.arrayBuffer())

  const decoder = new TextDecoder("utf-8")
  const recent = decoder.decode(await deflate(data)).split('\n')

  const recentIds = new Set<string>()
  for (let line of recent) {
    if (line.startsWith('# ')) continue
    
    const aValue = line.split(' ')[1]

    if (!aValue || !(/A[0-9]{6}/.test(aValue))) continue

    recentIds.add(aValue)
  }

  res.status(200).json({ recent: Array.from(recentIds.keys()) })
}
