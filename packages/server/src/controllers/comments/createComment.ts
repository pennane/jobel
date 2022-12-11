import { RequestHandler } from 'express'
import { path } from 'ramda'
import { EErrorType, throwError } from '../../middleware/errorHandler'
import { Comment } from '../../models/Comment/'
import { IComment } from '../../models/Comment/types'
import { Post } from '../../models/Post'

const MINIMUM_Comment_CONTENT_LENGTH = 2

const isValidContent = (s?: string) => !s || typeof s !== "string" || s.length < MINIMUM_Comment_CONTENT_LENGTH

const getPostId = path(['params', 'postId'])

export const createComment: RequestHandler = async (req, res) => {
    const { content } = req.body as Partial<IComment>
    const userId = req.tokenPayload?._id
    const postId = getPostId(req)

    if (!userId || typeof userId !== 'string') {
        return throwError(EErrorType.NOT_LOGGED_IN)
    }

    if (isValidContent(content)) {
        return res.status(400).send({ error: 'content missing' })
    }

    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).send({ error: 'post missing' })
    }

    const comment = new Comment({ content, userId, voters: [], postId })

    const savedComment = await comment.save();

    await Post.updateOne(
        { _id: post._id },
        { $push: { comments: savedComment._id } },
    )

    res.status(200).send(savedComment)
}
