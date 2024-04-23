import { useParams } from "react-router-dom"
import { characters } from "../../api/characters"
import { useEffect, useState } from "react"
import { Character } from "./interfaces/character.interfaces"
import { Box, Chip, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material"

const CharacterPage = () => {

  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    characters
      .getById({ id })
      .then((results) => {
        setCharacter(results.data)
        setLoading(false)
      })
      .catch((error) => { console.error(error) })
  }, [])


  return (
    <Box sx={{ width: "100%" }}>
      <Container>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid sx={{ my: 2 }} container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">{character!.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6">Especie: {character!.origin.name} </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip color="primary" variant="outlined" label={character!.status}></Chip>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img src={character!.image} style={{ width: "100%", borderRadius: "0.5em", height: "auto" }} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default CharacterPage