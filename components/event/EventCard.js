import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const EventCard = ({
  games,
  game,
  description,
  date,
  time,
  organizer,
  eventId,
  onDelete,
  joined,
  onJoinLeave,
}) => {
  const router = useRouter();
  const gameTitle = games.find((g) => g.id === game)?.title || 'Unknown Game';
  const [isJoined, setIsJoined] = useState(joined);

  const handleViewDetails = () => {
    router.push({
      pathname: '/events/1event',
      query: { eventId },
    });
  };

  const handleEditEvent = () => {
    router.push({
      pathname: '/events/edit',
      query: { eventId },
    });
  };

  const handleDeleteEvent = () => {
    onDelete(eventId);
  };

  const handleJoinLeave = () => {
    onJoinLeave(eventId, isJoined);
    setIsJoined(!isJoined);
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>By: {organizer}</Card.Title>
        <Card.Text>{date}, {time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{gameTitle}</Card.Footer>
      <Button onClick={handleViewDetails} className="mr-2">
        View Event Details
      </Button>
      <Button onClick={handleEditEvent} variant="primary">
        Edit Event
      </Button>
      <Button onClick={handleDeleteEvent} variant="danger">
        Delete Game
      </Button>
      <Button onClick={handleJoinLeave} variant={isJoined ? 'danger' : 'success'}>
        {isJoined ? 'Leave Event' : 'Join Event'}
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  game: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
  onJoinLeave: PropTypes.func.isRequired,
};

export default EventCard;
