import React from 'react';
import {Route, Routes} from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import NotFound from './pages/notFound/NotFound'
import News from './pages/news/News'

function App() {
  return (
    <div>
      <Routes>
        < Route path='/' element={<HomePage />} />
        < Route path='/item/:id' element={<News />} / >
        < Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
