/**
 * ThriftQueenPage - Thrift Queen game page
 *
 * URL: /thriftqueen
 */

import { useNavigate } from 'react-router-dom';
import { ThriftQueenGame } from '../games/ThriftQueenGame';

export function ThriftQueenPage() {
  const navigate = useNavigate();

  const handleNavigateToHub = () => {
    navigate('/hub');
  };

  return <ThriftQueenGame onNavigateToHub={handleNavigateToHub} />;
}
