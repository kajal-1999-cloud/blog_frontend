import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import { request } from "../../utils/fetchApi"

export default function CommentItem({ comment, token, user }) {
  const [replyText, setReplyText] = useState("")
  const [showReply, setShowReply] = useState(false)
  const navigate = useNavigate()

  const submitReply = async () => {
    if (!user) {
      message.warning("please login to comment")
      navigate("/login")
      return
    }
    if (!replyText.trim()) return

    await request(
      "/comments",
      "POST",
      { Authorization: `Bearer ${token}` },

      {
        blogId: comment.blogId,
        parentId: comment._id,
        text: replyText,
      }
    )

    setReplyText("")
    setShowReply(false)
  }

  return (
    <div className="commentItem">
      <strong>{comment.userId.username}</strong>
      <p>{comment.text}</p>

      <span
        className="replyBtn"
        onClick={() => {
          if (!user) {
            message.warning("please login to comment")
            navigate("/login")
            return
          }
          setShowReply(!showReply)
        }}
      >
        Reply
      </span>

      {showReply && (
        <div className="replyBox">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={submitReply}>Reply</button>
        </div>
      )}

      {comment?.replies?.map((reply) => (
        <CommentItem
          key={reply._id}
          comment={reply}
          token={token}
          user={user}
        />
      ))}
    </div>
  )
}
