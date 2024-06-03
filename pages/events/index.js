import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents, deleteEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
    getGames().then((data) => setGames(data));
  }, []);

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    const updatedEvents = await getEvents();
    setEvents(updatedEvents);
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
        {events.map((event) => (
          <div key={`event--${event.id}`} className="eventCard">
            <EventCard
              games={games}
              eventId={event.id}
              game={event.game}
              description={event.description}
              date={event.date}
              time={event.time}
              organizer={event.organizer}
              onDelete={handleDeleteEvent}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

export default Home;
