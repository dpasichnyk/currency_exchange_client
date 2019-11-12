import React from 'react';
import { Provider } from 'mobx-react';

import Content from './components/Content';

import 'bootstrap/dist/css/bootstrap.min.css';

import commonStore from './stores/commonStore';
import { Container } from "react-bootstrap";

const stores = { commonStore };

function App() {
  return (
    <div className="App">
      <div>
        <Provider {...stores}>
          <Container>
            <Content />
          </Container>
        </Provider>
      </div>
    </div>
  );
}

export default App;
