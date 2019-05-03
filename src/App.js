import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container-fluid ">
        <nav class="navbar navbar-light bg-light row justify-content-center">
          <a class="navbar-brand" href="#">
            Beyblade Matchup Ranking
          </a>
        </nav>
        <div className="row">
          <div className="col-md-6">

          <form>
            <div class="form-row align-items-center">
              <div class="col-auto my-1">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Preference</label>
                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-auto my-1">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
            </form>

          </div>
          <div className="col-md-6">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
