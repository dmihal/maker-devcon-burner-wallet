import React from 'react';
const classes = require('./Card.module.css');

const Card = ({ image, name, onClick }) => (
  <div className={classes.card} onClick={onClick}>
    <div className={classes.img} style={{ backgroundImage: image && `url(${image})` }} />
    <div className={classes.title}>{name}</div>
  </div>
);

export default Card;
