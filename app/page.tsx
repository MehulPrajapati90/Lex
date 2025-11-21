import { currentUser } from '@/actions/auth'
import UserButton from '@/components/auth/user-button';
import React from 'react'

const Home = async () => {
  const user = await currentUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <UserButton user={user} />
    </div>
  )
}

export default Home;