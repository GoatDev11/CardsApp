import React from 'react'

export { HomePage } from './Home'

export const LoginPage = React.lazy(() => import('./Login'))
export const CharacterPage = React.lazy(() => import('./character'))