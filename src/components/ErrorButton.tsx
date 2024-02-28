import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Back = styled.button`
  padding: 10px;
  background: #f2f2f2;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 0;

  &:hover {
    background: #e2e2e2;
    transform: scale(1.05);
    cursor: pointer;
  }
`

export const ErrorButton = ({ username }: { username: string }) => {
  return (
    <Link
      to={username !== undefined ? `/?username=${username}` : '/'}
      style={{ textDecoration: 'none', color: '#282c34' }}
    >
      <Back>⬅ Back to list</Back>
    </Link>
  )
}
