import React, { useEffect } from 'react'
import { NavBar } from './NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { useCookies } from 'react-cookie'

export const RouterLayout: React.FC<{}> = () => {
  const [, setCookie, removeCookie] = useCookies()
  const { isAuth, isExpired, accessToken } = useAppSelector(
    (state) => state.authReducer
  )

  useEffect(() => {
    if (accessToken) {
      setCookie('accessToken', accessToken)
    }
  }, [accessToken])

  useEffect(() => {
    if (isExpired) {
      removeCookie('accessToken')
    }
  }, [isExpired])

  return isAuth ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
