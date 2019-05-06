import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI(){
      fetch("http://localhost:9000/parts/energy")
          .then(res => res.json())
          .then(res => this.setState({ apiResponse: res.img_url }));
  }
  componentWillMount(){
      this.callAPI();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    var data  = {}

    for (var [key, value] of formdata.entries()) {
      data[key] = value
      // console.log(key, value);
    }
    console.log(data)

    fetch('http://localhost:9000/match/', {
      method: 'POST',
      body: data,
    });
  }

  render(){
    return (
      <div className="App">
        <div className="container-fluid">
          <header className="App-header row">
          </header>
          <div className="container-body row">
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                  <h3>Beyblade 1</h3>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Energy Layer</label>
                    <input type="energy-layer" id="el1" class="form-control" aria-describedby="el1" placeholder="Energy Layer Id" name="el1"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Forge Disc</label>
                    <input type="forge-disc" class="form-control" aria-describedby="fd1" placeholder="Forge Disc" name="fd1"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Performance Tip</label>
                    <input type="performance-tip" class="form-control" aria-describedby="pt1" placeholder="Performance Tip" name="pt1"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <h3>Beyblade 2</h3>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Energy Layer</label>
                    <input type="energy-layer" class="form-control" aria-describedby="el2" placeholder="Energy Layer Id" name="el2" />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Forge Disc</label>
                    <input type="forge-disc" class="form-control" aria-describedby="fd2" placeholder="Forge Disc" name="fd2"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Performance Tip</label>
                    <input type="performance-tip" class="form-control" aria-describedby="pt2" placeholder="Performance Tip" name="pt2"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <button type="submit" class="btn btn-primary" value="Submit">Submit <img src={this.state.apiResponse} className="App-logo" alt="logo" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
      );
  }
}

export default App;
