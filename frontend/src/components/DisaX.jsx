import { DisaxPostCard } from './DisaxPostCard'
import { useState, useEffect } from 'react'
import { watchCollection } from '../services/firebase.service'

const DisaX = () => {
  const [ tips, setTips] = useState([]) 


  useEffect(()=>{
    const path = "Tips"
    watchCollection(path, (snapshot)=>{
      const data = snapshot.docs.map(d=>({...d.data(), remoteId: d.id}))
      const sorted = data.sort((a,b)=>b.postedAt - a.postedAt)
      setTips(sorted)
    })
  }, [])


  return (
    <div className='text-xl  text-center pt-1 md:pt-5 '>
        <h2 className='pb-1 md:pb-3 text-lg md:text-xl border-gray-500 border-b-2 font-semibold '>WaverX</h2>

        <div className="disaster-posts-wrapper overflow-auto">
          {
            tips.map(p=>{
            return <DisaxPostCard key={p.remoteId} post={p} />
          })
          }
        </div>
        
    </div>
  )
}

export default DisaX