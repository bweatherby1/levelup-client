import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import {
  getEvents, deleteEvent, joinEvent, leaveEvent,
} from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const eventsData = await getEvents();
    const gamesData = await getGames();
    setEvents(eventsData);
    setGames(gamesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    fetchData();
  };

  const handleJoinLeave = async (eventId, joined) => {
    try {
      const updatedEvent = joined
        ? await leaveEvent(eventId)
        : await joinEvent(eventId);

      const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error joining/leaving event:', error);
    }
  };

  return (
    <article className="events">
      <header>
        <h1 className="header">Events</h1>
        <Button
          onClick={() => {
            router.push('/events/new');
          }}
        >
          Register New Event
        </Button>
      </header>
      <div className="eventContainer">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={`event--${event.id}`} className="eventCard">
              <EventCard
                games={games}
                event={event}
                onDelete={handleDeleteEvent}
                onJoinLeave={handleJoinLeave}
              />
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </article>
  );
}

export default Home;
