import './css/App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  };

  const handleOnClickLi = id => {
    setSelectedId(id);
    if (selectedId === id) setSelectedId('');
  };

  const handleCloseMovieDetail = () => {
    setSelectedId('');
  };

  return (
    <div className="App">
      <Navbar onChangeSearch={handleSearchChange} />
      <main>
        <ListBox
          searchValue={searchValue}
          onHandleSelectedId={handleOnClickLi}
          movies={movies}
          setMovies={setMovies}
        ></ListBox>
        <WatchedBox
          selectedId={selectedId}
          onCloseMovieDetail={handleCloseMovieDetail}
          setSelectedId={setSelectedId}
          onHandleSelectedId={handleOnClickLi}
        ></WatchedBox>
      </main>
    </div>
  );
}

export default App;
