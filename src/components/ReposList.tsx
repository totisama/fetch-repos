import styled from 'styled-components'
import useSWR from 'swr'

const List = styled.section`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`

const Repo = styled.a`
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
  text-decoration: none;
  color: #282c34;

  &:hover {
    transform: scale(1.05);
  }
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const ReposList = ({
  username = '',
  pageIndex = 1,
}: {
  username: string
  pageIndex: number
}) => {
  const { data, isLoading } = useSWR(
    `https://api.github.com/users/${username}/repos?per_page=5&page=${pageIndex}`,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (data?.message) return <Error>Error loading repos</Error>

  console.log(data)

  return (
    <List>
      {data?.map((repo) => (
        <Repo
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <h1>{repo.name}</h1>
          <h2>{repo.language}</h2>
          Created at: {new Date(repo.created_at).toLocaleDateString()}
          {repo.description !== null && (
            <p>
              <strong>Description:</strong>
              <br />
              {repo.description}
            </p>
          )}
        </Repo>
      ))}
    </List>
  )
}
