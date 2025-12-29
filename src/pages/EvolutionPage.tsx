/**
 * EvolutionPage - I AM BECOME EVOLUTION
 *
 * URL: /evolution
 */

import { useNavigate } from 'react-router-dom';
import { EvolutionGame } from '../games/EvolutionGame';

export function EvolutionPage() {
  const navigate = useNavigate();

  const handleNavigateToHub = () => {
    navigate('/hub');
  };

  return <EvolutionGame onNavigateToHub={handleNavigateToHub} />;
}
