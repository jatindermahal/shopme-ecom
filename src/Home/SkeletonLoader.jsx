import { Skeleton } from '@mui/material'
import React from 'react'

function SkeletonLoader() {
  return (
    <div className="skeleton">
        <Skeleton variant="rectangular" className='skeleton-name mb-3' height={35} />
        <Skeleton variant="rectangular" className='skeleton-img' />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
    </div>
  )
}

export default SkeletonLoader
