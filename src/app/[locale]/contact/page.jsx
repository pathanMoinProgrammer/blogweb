"use client"
import { items } from '@/components/jotai'
import { useAtom } from 'jotai'
import React from 'react'

const page = () => {
  // const [item, setitem]= useAtom(items)
  return (
    <div>
      {/* {item} */}
      {/* <button onClick={()=> setitem(prev => prev+1)}>Increase</button> */}
      Its Contact Page
    </div>
  )
}

export default page
