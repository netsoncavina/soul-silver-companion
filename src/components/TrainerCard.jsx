import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TrainerCard(trainer) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='280'
        image={trainer.trainer.trainer_picture}
        title={trainer.trainer.trainer_name}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {trainer.trainer.trainer_name}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {trainer.trainer.encounter_day.charAt(0).toUpperCase() +
            trainer.trainer.encounter_day.slice(1)}
          {trainer.trainer.encounter_time &&
            `, ${trainer.trainer.encounter_time}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Mais informações</Button>
      </CardActions>
    </Card>
  );
}
