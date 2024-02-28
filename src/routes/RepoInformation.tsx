import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import { Repository } from '../types'
import { ErrorButton } from '../components/ErrorButton'

const Information = styled.main`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const OnError = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  if (error || repo === undefined || repo.status === false)
    return (
      <OnError>
        <ErrorButton username={String(username)} />
        <Error>Error loading repo information</Error>
      </OnError>
    )

  return (
    <Page>
      <ErrorButton username={String(username)} />
      <Information>
        <a href={repo?.owner?.html_url} target="_blank" rel="noreferrer">
          <Avatar src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
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
