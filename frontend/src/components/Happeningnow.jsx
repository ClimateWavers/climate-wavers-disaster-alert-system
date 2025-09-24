import { DisaxPostCard } from './DisaxPostCard';
import { useState, useEffect } from 'react'
import { watchCollection } from "../services/firebase.service";

const Happeningnow = () => {
  const [posts, setPosts ] = useState([])
  useEffect(()=>{
    const path = "Posts"
    watchCollection(path, (snapshot)=>{
      const data = snapshot.docs.map(d=>({...d.data(), remoteId: d.id}))
      const sorted = data.sort((a,b)=>b.postedAt - a.postedAt)
      setPosts(sorted)
    })
  }, [])
  return (
    <div className='text-xl text-center   pt-1 md:pt-5 '>
        <h2 className='pb-1 md:pb-3 text-lg md:text-xl border-gray-500 border-b-2 font-semibold '>Disasters Reports</h2>
        {
            posts.map(p=>{
            return <DisaxPostCard key={p.remoteId} post={p} />
          })
          }    </div>
  )
}

export default Happeningnow