import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGameTypes, createGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: null,
};

const GameForm = ({ user, obj, onSubmit }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [formData, setFormData] = useState(
    obj
      ? {
        skillLevel: obj.skill_level,
        numberOfPlayers: obj.number_of_players,
        title: obj.title,
        maker: obj.maker,
        gameTypeId: obj.game_type,
      }
      : initialState,
  );
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then((types) => {
      setGameTypes(types);
    }).catch((error) => {
      console.error('Error fetching game types:', error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: formData.maker,
      title: formData.title,
      numberOfPlayers: Number(formData.numberOfPlayers),
      skillLevel: Number(formData.skillLevel),
      gameType: Number(formData.gameTypeId),
      userId: user.uid,
    };

    if (obj) {
      onSubmit(game);
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            required
            value={formData.maker}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            type="number"
            name="numberOfPlayers"
            value={formData.numberOfPlayers}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            type="number"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Control
            as="select"
            name="gameTypeId"
            value={formData.gameTypeId}
            onChange={handleChange}
          >
            <option value="">Select a game type</option>
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj ? 'Update Game' : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    skill_level: PropTypes.number.isRequired,
    number_of_players: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    game_type: PropTypes.number.isRequired,
  }),
  onSubmit: PropTypes.func,
};

GameForm.defaultProps = {
  obj: null,
  onSubmit: () => {},
};

export default GameForm;
