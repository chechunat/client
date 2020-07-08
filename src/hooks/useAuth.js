// Hook Creado por nosotros para coprobar los tokens

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export default() => useContext(AuthContext);