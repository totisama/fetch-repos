import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import { Repository } from '../types'

const Information = styled.main`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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

const SpecificInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  gap: 10px;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`

const Page = styled.div`
  padding: 20px;
`

const Extra = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: normal;
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

export default function RepoInformation() {
  const { username, projectName } = useParams()
  const {
    data: repo,
    isLoading,
    error,
  } = useSWR<Repository>(
    `https://youtube.thorsteinsson.is/api/repo?username=${username}&project=${projectName}`,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error>Error loading repo information</Error>

  return (
    <Page>
      <Back>
        <Link to="/" style={{ textDecoration: 'none', color: '#282c34' }}>
          ⬅ Back to list
        </Link>
      </Back>
      <Information>
        <a href={repo?.owner.html_url} target="_blank" rel="noreferrer">
          <Avatar src={repo?.owner.avatar_url} alt={repo?.owner.login} />
        </a>
        <h1>{repo?.name}</h1>
        <SpecificInfo>
          <Extra>
            Language: <strong>{repo?.language}</strong>
          </Extra>
          <Extra>
            Stars: <strong>{repo?.stargazers_count}</strong>
          </Extra>
        </SpecificInfo>
        <p>
          <strong>Description:</strong>
          <br />
          {repo?.description !== null ? repo?.description : 'No description'}
        </p>
        <a href={repo?.html_url} target="_blank" rel="noreferrer">
          <strong>View on GitHub</strong>
        </a>
      </Information>
    </Page>
  )
}
