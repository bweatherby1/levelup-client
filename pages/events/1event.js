import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../utils/data/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({
    game: '',
    description: '',
    date: '',
    time: '',
    organizer: '',
  });
  const router = useRouter();

  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      getSingleEvent(eventId)
        .then((data) => {
          setEventDetails(data);
        })
        .catch((error) => console.error('Error fetching event details:', error));
    }
  }, [eventId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div>
        <h2>{eventDetails.description}</h2>
        <p>Game: {eventDetails.game}</p>
        <p>Date: {eventDetails.date}</p>
        <p>Time: {eventDetails.time}</p>
        <p>Organizer: {eventDetails.organizer}</p>
      </div>
    </div>
  );
}
