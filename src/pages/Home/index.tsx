import { Box, Button, CircularProgress, Container, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CardComponent, Header } from '../../components'
import { characters } from '../../api/characters'
import { TypeCharacter } from './interface/character.interface'

export const HomePage: React.FC<{}> = () => {

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [allCharacters, setAllCharacters] = useState<TypeCharacter[] | null>(null)
  const [loading, setLoading] = useState(true);

  // React.useEffect(() => {
  //   characters.getAll({ page: 1 }).then((r) => {
  //     setAllCharacters(r.data.results)
  //   }).catch((e) => {
  //     console.error(e)
  //   })
  // }, [])


  useEffect(() => {
    setLoading(true);
    characters
      .getAll({ page })
      .then((r) => {
        setCount(r.data.info.pages);
        setAllCharacters(r.data.results);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      <Header
        title="Home"
        description="This is the home page, welcome"
        element={
          <Button fullWidth variant='contained'>
            Welcome
          </Button>
        }
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {allCharacters!.length !== 0 ? (
              <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                {allCharacters!.map((character) => (
                  <Grid item xs={3} key={character.id}>
                    <CardComponent
                      image={character.image}
                      name={character.name}
                      species={character.species}
                      status={character.status}
                      id={character.id}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              "No data"
            )}
          </div>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              variant="outlined"
              color="primary"
              count={count}
              page={page}
              onChange={handleChange}
              sx={{ mb: 3 }}
              size="large"
            />
          </Box>
        </>
      )}
    </Container>
  );
};
