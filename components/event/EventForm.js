import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
};

const EventForm = ({ user, eventObj }) => {
  const [formData, setFormData] = useState(eventObj || initialState);
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventObj) {
      setFormData({
        game: eventObj.game,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        organizer: eventObj.organizer,
      });
    }
  }, [eventObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: formData.game,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      organizer: formData.organizer,
      userId: user.uid,
    };

    if (eventObj) {
      updateEvent(eventId, event)
        .then(() => {
          // Event updated successfully
          router.push('/events');
        })
        .catch((error) => {
          console.error('Error updating event:', error);
          // You can also display an error message to the user here
        });
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Control
            name="game"
            required
            value={formData.game}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Control
            name="organizer"
            required
            value={formData.organizer}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {eventObj ? 'Update Event' : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    game: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    organizer: PropTypes.number.isRequired,
  }),
};

EventForm.defaultProps = {
  eventObj: null,
};

export default EventForm;
