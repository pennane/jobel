import { RequestHandler } from 'express'
import { Post } from '../../models/Post'

const parseDate = (s: unknown) => {
    const shouldParse = !!s && (typeof s === 'string' || typeof s === 'number');
    if (!shouldParse) return null

    return new Date(s)
}

export const getPosts: RequestHandler = async (req, res) => {
    // ?olderThan=Date
    const olderThan = parseDate(req.query.olderThan)

    let posts

    if (olderThan) {
        posts = await Post.find({ timeStamp: { $lt: olderThan } }).limit(10).sort('-timeStamp').exec()
    } else {
        posts = await Post.find({}).limit(10).sort('-timeStamp').exec()
    }

    res.send({ posts: posts || [] })
}
