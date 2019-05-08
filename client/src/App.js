import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  apiResponse: "",
                  el1:{
                    img_url : ""
                  },
                  fd1: {
                    img_url : ""
                  },
                  pt1:{
                    img_url : ""
                  },
                  el2:{
                    img_url : ""
                  },
                  fd2:{
                    img_url : ""
                  },
                  pt2:{
                    img_url : ""
                  }
                };
    this.handleSubmit = this.handleSubmit.bind(this)
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
    var ret_data = {}
    const data = new FormData(event.target);
    //
    // for (let name of data.keys()) {
    //   for (let name of data.keys()) {
    //     const input = form.elements[name];
    //     const parserName = input.dataset.parse;
    //
    //     if (parserName) {
    //       const parser = inputParsers[parserName];
    //       const parsedValue = parser(data.get(name));
    //       data.set(name, parsedValue);
    //     }
    //   }
    // }

    for(var pair of data.entries()) {
      ret_data[pair[0]] = pair[1]
    }

    console.log(ret_data)

    fetch('http://localhost:9000/match/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ret_data)
    }).then(res => res.json())
      .then(res => this.setState({el1:res[0][0],
                                  fd1: res[1][0],
                                  pt1: res[2][0],
                                  el2:res[3][0],
                                  fd2:res[4][0],
                                  pt2:res[5][0]}));
  }

  render(){
    console.log(this.state.apiResponse)
    return (
      <div className="App">
        <div className="container-fluid">
          <header className="App-header row">
          </header>
          <div className="container-body row">
          <form className="col-md-12" method="post" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                  <h3>Beyblade 1</h3>
                  <div className="form-group align-items-center form-row">
                    <div className="col-8">
                      <input type="energy-layer" id="el1" class="form-control" aria-describedby="el1" placeholder="Energy Layer Id" name="el1"/>
                    </div>
                    <div className="col-4">
                      <img src={this.state.el1.img_url} className="partShow" alt="el1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center form-row">
                    <div className="col-8">
                      <input type="forge-disc" id="fd1" class="form-control" aria-describedby="fd1" placeholder="Forge Disc Id" name="fd1"/>
                    </div>
                    <div className="col-4">
                      <img src={this.state.fd1.img_url} className="partShow" alt="fd1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center form-row">
                    <div className="col-8">
                      <input type="performace-tip" id="pt1" class="form-control" aria-describedby="pt1" placeholder="Performance Tip Id" name="pt1"/>
                    </div>
                    <div className="col-4">
                      <img src={this.state.pt1.img_url} className="partShow" alt="pt1" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                    <h3>Beyblade 2</h3>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.el2.img_url} className="partShow" alt="el2" />
                      </div>
                      <div className="col-8">
                        <input type="energy-layer" id="el2" class="form-control" aria-describedby="el2" placeholder="Energy Layer Id" name="el2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.fd2.img_url} className="partShow" alt="fd2" />
                      </div>
                      <div className="col-8">
                        <input type="forge-dics" id="fd2" class="form-control" aria-describedby="fd2" placeholder="Forge Disc Id" name="fd2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.pt2.img_url} className="partShow" alt="pt2" />
                      </div>
                      <div className="col-8">
                        <input type="performace-tip" id="pt2" class="form-control" aria-describedby="pt2" placeholder="Performance Tip Id" name="pt2"/>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="row justify-content-center">
                <button type="submit" class="btn btn-primary" value="Submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      );
  }
}

export default App;
