import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setItem } from "../../utils/localStorage"
import { addToCart } from "../../redux/slices/cart.slice"

type CardProps = {
  image: string,
  name: string,
  status: string,
  species: string,
  id: number
}

export const CardComponent = ({
  image,
  name,
  status,
  species,
  id
}: CardProps) => {

  const [disabledBtn, setDisabledBtn] = useState(false);

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const itemExist = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    setDisabledBtn(itemExist.some((item) => item.id === id));
    setItem('cart', itemExist);
  }, [itemExist, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        image,
        info: status,
      }),
    );
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: 430, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h4">{name}</Typography>
        <Divider />
        <Typography sx={{ mt: 1.5 }}>Especie: {species} </Typography>
        <Typography sx={{ mt: 1.5 }}>Estado: {status}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end", alignSelf: "center" }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => navigate(`/character/${id}`)}
        >
          Learn More
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabledBtn}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}