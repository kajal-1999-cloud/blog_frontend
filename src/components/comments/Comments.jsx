import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import socket from "../../utils/socket"
import { request } from "../../utils/fetchApi"
import CommentItem from "./CommentItem"
import { buildCommentTree } from "../../utils/commentTree"
import "./comments.css"

export default function Comments({ blogId, token, user }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!blogId) return

    socket.emit("joinBlog", blogId)

    const fetchComments = async () => {
      try {
        const data = await request(`/comments/${blogId}`, "GET")
        setComments(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setComments([])
      }
    }

    fetchComments()

    socket.on("newComment", (comment) => {
      setComments((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        comment,
      ])
    })

    return () => socket.off("newComment")
  }, [blogId])

  const submitComment = async () => {
    if (!user) {
      message.warning("please login to comment")
      navigate("/login")
      return
    }
    if (!text.trim()) return

    await request(
      "/comments",
      "POST",
      { Authorization: `Bearer ${token}` },

      {
        blogId,
        text,
      }
    )

    setText("")
  }

  const tree = buildCommentTree(comments)

  return (
    <div className="commentsSection">
      <h3>Comments</h3>

      <textarea
        placeholder={user ? "Write a comment..." : "Login to write a comment..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submitComment}>Post Comment</button>

      <div className="commentList">
        {tree.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            token={token}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}
