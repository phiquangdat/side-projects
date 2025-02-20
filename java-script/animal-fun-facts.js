import React from 'react';
import { createRoot } from 'react-dom/client';
import { animals } from './animals';

const container = document.getElementById('app');
const root = createRoot(container);

const title = '';

const displayFact = (e) => {
  const nameAnimal = e.target.alt;
  const idx = Math.floor(Math.random() * animals[nameAnimal].facts.length);
  const funFact = animals[nameAnimal].facts[idx];
  document.getElementById('fact').innerHTML = funFact;
};

const images = [];
for (let animal in animals) {
  images.push(
    <img
      key={animal}
      className="animal"
      alt={animal}
      src={animals[animal].image}
      aria-label={animal}
      role="button"
      onClick={displayFact}
    />
  );
}

const showBackground = false;

const animalFacts = (
  <div>
    {showBackground && <img className="background" alt="ocean" src="/images/ocean.jpg" />}
    <div className="animalFacts">
      {images}
    </div>
    <h1>{title || 'Click an animal for a fun fact'}</h1>
    <p id="fact"></p>
  </div>
);

root.render(animalFacts);
