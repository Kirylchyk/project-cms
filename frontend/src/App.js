import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import ContentList from './components/ContentList/ContentList';


function App() {
  return (
      <div>
        <Header />
        <Main />

          <div className="App">
              <ContentList />
          </div>

        <Footer />
      </div>
  );
}

export default App;
