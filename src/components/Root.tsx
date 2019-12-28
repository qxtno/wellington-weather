import React from 'react';
import { Nav } from './Nav';
import { WeatherCards } from './WeatherCards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AddLocation } from './AddLocation';

export const Root: React.FC = () => {
  return (
    <Router>
      <div
        className="h-full w-full"
        style={{ display: 'grid', gridTemplateRows: 'auto 80px' }}
      >
        <main className="overflow-auto">
          <div className="pb-2">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/add-location">
                <AddLocation />
              </Route>
              <Route path="/">
                <WeatherCards />
              </Route>
            </Switch>
          </div>
        </main>
        <div
          className="bg-gray-200 z-0"
          style={{
            gridRow: 2,
            boxShadow:
              '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <Nav />
        </div>
      </div>
    </Router>
  );
};
