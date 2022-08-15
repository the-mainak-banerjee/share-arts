import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectSignedInUser } from '../../features/users/usersSlice'

const PrivateRoutes = () => {
    const currUser = useSelector(selectSignedInUser)
    const location = useLocation()
  return (
    currUser?.userId ? (
        <Outlet/>
    ) : (
        <Navigate to='/auth' state={{from: location}}/>
    )
  )
}

export default PrivateRoutes
