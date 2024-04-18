import { useState } from 'react';
import Card from './Card';

const Home = () => {
  const [tables, setTables] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return (
    <main>
      <header></header>
      <body>
        {tables.map((item, index) => (
          <Card key={index} />
        ))}
      </body>
    </main>
  );
};

export default Home;
