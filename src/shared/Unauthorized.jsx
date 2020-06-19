/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import historyRoutes from '../routing/historyRoutes';

export default function Unauthorized() {
  return (
   <div>
        Unauthorized!
       <Link to={historyRoutes.dashboard.base}>Go Back</Link>
   </div>
  );
}
