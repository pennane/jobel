import { Tag } from '../../../Tag'

const parseVisibleUserId = (id) => (id === 0 ? 'og' : id)

export const UserTag = ({ visibleUserId }) => {
  return <Tag>@{parseVisibleUserId(visibleUserId)}</Tag>
}
