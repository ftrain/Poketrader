/**
 * PoketraderPage - Pokemon trading card game
 *
 * URL: /poketrader
 *
 * This page uses the new JSON game engine implementation.
 */

import { useNavigate } from 'react-router-dom';
import { PoketraderGame } from '../games/PoketraderGame';
import '../games/GameHub.css';

export function PoketraderPage() {
  const navigate = useNavigate();

  return (
    <PoketraderGame onNavigateToHub={() => navigate('/hub')} />
  );
}
