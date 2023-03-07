import { useState } from 'react';

import type { MouseEvent } from 'react';
import type { Criteria } from '@/types/Criteria';
import type { Flight } from '@/types/Flight';

import styles from './Flights.module.css';

type Sort = 'asc' | 'desc';

interface Props {
  criteria: Criteria | null;
  flights: Array<Flight>;
}

export const Flights = ({ flights, criteria }: Props) => {
  const [sort, setSort] = useState<Sort>('asc');

  function onSort(event: MouseEvent<HTMLButtonElement>) {
    if (sort === 'asc') setSort('desc');
    else setSort('asc');
  }

  function sortByExpectedTime(flightA: Flight, flightB: Flight) {
    let sortDirection = 0;

    if (flightA.expectedTime < flightB.expectedTime) {
      sortDirection = -1;
    } else if (flightA.expectedTime > flightB.expectedTime) {
      sortDirection = 1;
    }

    return sort === 'asc' ? sortDirection : sortDirection * -1;
  }

  return (
    <div className={styles.flights}>
      {flights.length ? (
        <>
          <div className={styles['flights-list-header']}>
            <div>
              {criteria?.flightDate && (
                <p>
                  Datum:{' '}
                  {new Date(criteria.flightDate).toLocaleDateString('nl-NL', { timeZone: 'UTC', dateStyle: 'full' })}{' '}
                </p>
              )}

              <p>Aantal gevonden vluchten: {flights.length}</p>
            </div>

            {criteria?.flightDate && flights.length > 1 && (
              <div>
                <button className={styles['flights-list-sort-button']} onClick={onSort}>
                  Sorteer {sort === 'asc' ? <>&uarr;</> : <>&darr;</>}
                </button>
              </div>
            )}
          </div>

          <ul className={styles['flights-list']}>
            {flights.sort(sortByExpectedTime).map((flight) => (
              <li className={styles['flights-list-card']} key={flight.flightIdentifier}>
                <div className={styles['flights-list-card__section']}>
                  {flight.expectedTime}
                  {!criteria?.flightDate && (
                    <div>
                      {new Date(flight.date).toLocaleDateString('nl-NL', { timeZone: 'UTC', dateStyle: 'medium' })}
                    </div>
                  )}
                </div>
                <div className={styles['flights-list-card__section']}>
                  <strong className={styles['flights-list-card__airport']}>{flight.airport}</strong>
                  {flight.flightNumber}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span>Geen vluchten gevonden</span>
      )}
    </div>
  );
};
