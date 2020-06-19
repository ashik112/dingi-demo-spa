/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import historyRoutes from '../routing/historyRoutes';

export default function NotFound() {
  return (
    <div>
      404: Not Found
      <Link to={historyRoutes.dashboard.base}>Go Back</Link>
    </div>
  );
}
