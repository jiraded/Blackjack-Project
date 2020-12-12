import { useState, FormEvent } from 'react'
import { SIGNIN } from '../graphql/mutations'
import { User, MutationSigninArgs } from '../graphql/generated'
import { useMutation } from '@apollo/client'

interface Props {}

const LoginPage = ({}): Props => {
  const [username, setUsername] = useState('player')
  const [password, setPassword] = useState('123456')

  const [signin] = useMutation<{ signin: User }, MutationSigninArgs>(SIGNIN)

  const handleSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    const res = await signin({ variables: { username, password } })
    console.log(res.data?.signin.username)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default LoginPage
