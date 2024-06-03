import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../utils/data/eventData';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

export default function EditEvent() {
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (eventId) {
      getSingleEvent(eventId).then(setEditItem);
    }
  }, [eventId]);

  return editItem && user ? (
    <EventForm eventObj={editItem} user={user} eventId={eventId} />
  ) : (
    <div>Loading...</div>
  );
}
