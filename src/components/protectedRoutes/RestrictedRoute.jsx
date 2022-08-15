import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectSignedInUser } from '../../features/users/usersSlice'

const RestrictedRoute = () => {
    const currUser = useSelector(selectSignedInUser)
  return (
    currUser?.userId ? (
        <Navigate to='/'/>
    ) : (
        <Outlet/>
    )
  )
}

export default RestrictedRoute
