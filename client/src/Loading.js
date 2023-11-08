import React from 'react'

function LoadingPage() {
  return (
    <div className="flex flex-row gap-2 flex justify-center mt-10">
   <div className="w-4 h-4 rounded-full bg-orange-200 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-orange-200 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-orange-200  animate-bounce [animation-delay:-.5s]"></div>
</div>
    
  )
}

export default LoadingPage
