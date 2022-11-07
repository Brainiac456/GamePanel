import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const CardInfo = styled(CardContent)(({theme}) => ({
    '&:last-child': {
        paddingBottom: theme.spacing(2),
      }
  }));

const MovieCard = ({ movie }) => {
    console.log('movie', movie)
    return (
        <Card sx={{ maxWidth: 70, position: "relative" }}>
            <Box sx={{ position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="70"
                    image={movie}
                    />
            </Box>

        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        releaseDate: PropTypes.string
    }).isRequired,
}

export default MovieCard;