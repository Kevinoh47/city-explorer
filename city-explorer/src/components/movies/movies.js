import React from 'react';

const Movies = props => {

  return (
    <section className="movies-container">
      <h3>Results from the Movies API</h3>
      <ul className="movies-results">

      {props.data && 
        props.data.map((item, key) => {

        return (
          <li key={key}>
            <p>
              <span>{ item.title }</span> 
              was relased on { item.released_on }. Out of { item.total_votes } total votes, {item.title} has an average vote of { item.average_votes } and a popularity score of { item.popularity }.</p>
              <img src={ item.image_url } alt=""/> 
              <p>{ item.overview }</p>
          </li>
        );
      })}
      </ul>
    </section>
  );
}

export default Movies;