import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'; // Importing the router

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
  eventId,
}) => {
  const router = useRouter(); // Initializing the router

  const handleClick = () => {
    router.push({
      pathname: '/events/1event',
      query: { eventId },
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>By: {organizer}</Card.Title>
        <Card.Text>{date}, {time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{game}</Card.Footer>
      <Button onClick={handleClick}>View Event Details</Button>
    </Card>
  );
};

EventCard.propTypes = {
  game: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
};

export default EventCard;
