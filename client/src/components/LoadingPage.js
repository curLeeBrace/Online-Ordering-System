import React from 'react'

function LoadingPage() {
  return (
    
    <div class="flex flex-row ml-2 gap-2 mt-2">
   <div class="w-3 h-3 rounded-full bg-orange-200 animate-bounce"></div>
  <div class="w-3 h-3 rounded-full bg-orange-200 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-3 h-3 rounded-full bg-orange-200  animate-bounce [animation-delay:-.5s]"></div>
</div>
    
  )
}

export default LoadingPage