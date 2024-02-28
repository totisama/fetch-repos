import './../App.css'
import styled from 'styled-components'
import { ReposList } from '../components/ReposList'
import { useState } from 'react'

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`

const Container = styled.main`
  width: 90%;
  padding: 15px;
  gap: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Form = styled.form`
  background: #ffffff;
  width: 80%;
  display: flex;
  margin: 0 auto;
  padding: 35px;
  border-radius: 10px;
  gap: 20px;
`

const ButtonForm = styled.button`
  outline: 0;
  background: #282c34;
  width: 20%;
  height: 50px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;

  &:hover,
  &:focus,
  &:active {
    background: #283a5d;
  }
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 2px solid #282c34;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`

const Buttons = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Button = styled.button`
  outline: 0;
  background: #282c34;
  width: 25%;
  height: 50px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #283a5d;
  }
`

export default function SearchRepos() {
  const [username, setUsername] = useState('')
  const [pageIndex, setPageIndex] = useState(1)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as typeof e.currentTarget & {
      username: { value: string }
    }

    setPageIndex(1)
    setUsername(form.username.value)
  }

  const changePage = (action: 'PREVIOUS' | 'NEXT') => {
    if (username === '') return

    if (action === 'PREVIOUS') {
      if (pageIndex > 1) {
        setPageIndex(pageIndex - 1)
      }
    } else {
      setPageIndex(pageIndex + 1)
    }
  }

  return (
    <Page>
      <Container onSubmit={submit}>
        <Form>
          <Input type="text" name="username" placeholder="username" />
          <ButtonForm>Search repos</ButtonForm>
        </Form>
        {username !== '' && (
          <ReposList username={username} pageIndex={pageIndex} />
        )}
        <Buttons>
          <Button onClick={() => changePage('PREVIOUS')}>Previous</Button>
          <Button onClick={() => changePage('NEXT')}>Next</Button>
        </Buttons>
      </Container>
    </Page>
  )
}
