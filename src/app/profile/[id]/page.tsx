import React from 'react'

export default function UserProfilePage({params}: any) {
  return (
    <div>
      this is new profile with id page

      <p className="text-2xl">Profile page {params.id}</p>
    </div>
  )
}
