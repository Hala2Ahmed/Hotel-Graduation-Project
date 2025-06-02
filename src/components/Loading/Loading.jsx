import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-row gap-2 h-screen justify-center items-center">
  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce" />
  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]" />
  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]" />
</div>
  )
}
