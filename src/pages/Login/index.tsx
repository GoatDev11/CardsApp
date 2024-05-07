import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { LoginValidate } from '../../utils/validateForm'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Navigate, useNavigate } from 'react-router-dom'
import { authThunk } from '../../redux/thunks/auth.thunk'

type LoginType = {
  username: string
  password: string
}

const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { isAuth } = useAppSelector((state) => state.authReducer)

  const formik = useFormik<LoginType>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidate,
    onSubmit: (values: LoginType) => {
      dispatch(authThunk(values))
      navigate('/')
      // getSuccess(JSON.stringify(values));
    },
  });

  const dispatch = useAppDispatch()

  return (

    isAuth ?
      <Navigate to='/' replace />
      :
      <Container maxWidth="xl">
        <Grid
          container
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ minHeight: '100vh' }}
        >
          <Grid item>
            <Paper sx={{ padding: '1.2rem', borderRadius: '0.5rem' }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h4">Iniciar sesión</Typography>
              <Box component={'form'} onSubmit={formik.handleSubmit}>
                <TextField
                  name="username"
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Email"
                  sx={{ mt: 2, mb: 1.5 }}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  name="password"
                  margin="normal"
                  type="password"
                  fullWidth
                  label="Password"
                  sx={{ mt: 1.5, mb: 1.5 }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1.5, mb: 3 }}
                >
                  Iniciar sesión
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
  )
}

export default LoginPage