export const buildCommentTree = (comments) => {
  const map = {}
  const roots = []

  comments?.forEach((c) => {
    map[c._id] = { ...c, replies: [] }
  })

  comments?.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.replies.push(map[c._id])
    } else {
      roots.push(map[c._id])
    }
  })

  return roots
}
