import styled from 'styled-components'
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import { fetcher } from '../utils/fetcher'
import { Repository } from '../types'

const List = styled.section`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`

const Repo = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.05);
  }
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`

const SubTitle = styled.h2`
  font-size: 16px;
  margin: 0;
`

export const ReposList = ({
  username = '',
  pageIndex = 1,
}: {
  username: string
  pageIndex: number
}) => {
  const { data, isLoading, error } = useSWR<Repository[]>(
    `https://youtube.thorsteinsson.is/api/repos?username=${username}&per_page=5&page=${pageIndex}`,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error || data === undefined) return <Error>Error loading repos</Error>

  return (
    <List>
      {data.length > 0 ? (
        data?.map((repo) => (
          <Repo key={repo.id}>
            <Link
              to={`/repo/${repo.full_name}`}
              style={{ textDecoration: 'none', color: '#282c34' }}
            >
              <Title>{repo.name}</Title>
              <SubTitle>{repo.language}</SubTitle>
            </Link>
          </Repo>
        ))
      ) : (
        <Error>No more existing repos</Error>
      )}
    </List>
  )
}
