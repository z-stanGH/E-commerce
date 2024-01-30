import { Button } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Recipes = () => {
  const navigate = useNavigate();
  const { userId, itemId } = useParams();
  console.log('UserId: ' + userId + ' ItemId: ' + itemId);
  return (
    <div>
      Recipes for cart:{userId} and item: {itemId}
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export default Recipes;
