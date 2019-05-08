import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
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
                  },
                  el1Results:[],
                  el2Results:[],
                  fd1Results:[],
                  fd2Results:[],
                  pt1Results:[],
                  pt2Results:[]
                };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
  }

  componentDidMount(){
      this.setState({
        el1Input:"",
        el2Input:"",
        fd1Input:"",
        fd2Input:"",
        pt1Input:"",
        pt2Input:""
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    let ret_data = {}
    const data = new FormData(event.target);
    for(var pair of data.entries()) {
      ret_data[pair[0]] = pair[1]
    }

    console.log(ret_data)

    fetch('http://localhost:9000/api/', {
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

  handleChange(event){
    let obj = {}
    let val = event.target.value;
    let type;
    let name = event.target.name;

    if(name.includes("el")){
      type = "Energy Layer";
    } else if(name.includes("fd")){
      type = "Forge Disc"
    } else{
      type="Performance Tip"
    }

    let id = event.target.id
    fetch('http://localhost:9000/api/part', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({part_type:type, query:val})
    }).then(res => res.json())
    .then(res => {
      if(res.length ==0 ){
        console.log("sql query empty")
        let obj = {};
        obj[id] = val;
        this.setState(obj);
      }else{
        let obj = {};
        obj[id] = val;
        obj[name] = res[0]
        obj[name+'Results'] = res
        this.setState(obj)
      }
    });
  }

  handleOptionClick(event){
    let obj = {}
    let val = event.target.textContent;
    let type;
    let name = event.target.name;

    if(name.includes("el")){
      type = "Energy Layer";
    } else if(name.includes("fd")){
      type = "Forge Disc"
    } else{
      type="Performance Tip"
    }

    let id = event.target.id
    fetch('http://localhost:9000/api/part', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({part_type:type, query:val})
    }).then(res => res.json())
    .then(res => {
      if(res.length ==0 ){
        console.log("sql query empty")
        let obj = {};
        obj[id] = val;
        this.setState(obj);
      }else{
        let obj = {};
        obj[id] = val;
        obj[name] = res[0]
        obj[name+'Results'] = res
        this.setState(obj)
      }
    });
  }



  renderPart(pt, q, part){
    fetch('http://localhost:9000/api/part', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({part_type:pt, query:q})
    }).then(res => res.json())
    .then(res => {
      let obj = {};
      obj[part] = res[0]
      this.setState(obj)
    });
  }

  returnQueriedMenuList(part){
    console.log(this.state[part+"Results"])
    let ret_array = []
    for(let i=0; i<this.state[part+"Results"].length;i++){
      ret_array.push(<span><a id="el1Input" name="el1" className="btn" onClick={this.handleOptionClick}>{this.state[part+"Results"][i].name_hasbro}</a><br/></span>)
    }
    return(
      ret_array
    )
  }

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <div className="container-fluid">
          <header className="App-header row">
          </header>
          <div className="container-body row">
          <form className="col-md-12" method="post">
            <div className="row">
              <div className="col-md-6">
                  <h3>Beyblade 1</h3>
                  <div className="form-group align-items-center form-row">
                    <div className="col-sm-4">
                      <input value={this.state.el1Input} onChange={this.handleChange} id="el1Input" class="form-control" aria-describedby="el1" placeholder="Energy Layer Name" name="el1"/>
                    </div>
                    <div className="col-4">
                      <div className="scrollable-menu">
                        {this.returnQueriedMenuList("el1")}
                      </div>
                    </div>
                    <div className="col-4">
                      <img src={this.state.el1.img_url} className="partShow" alt="el1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center form-row">
                    <div className="col-8">
                      <input value={this.state.fd1Input} onChange={this.handleChange} id="fd1Input" class="form-control" aria-describedby="fd1" placeholder="Forge Disc Name" name="fd1"/>
                    </div>
                    <div className="col-4">
                      <img src={this.state.fd1.img_url} className="partShow" alt="fd1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center form-row">
                    <div className="col-8">
                      <input value={this.state.pt1Input} onChange={this.handleChange} id="pt1Input" class="form-control" aria-describedby="pt1" placeholder="Forge Disc Name" name="pt1"/>
                    </div>
                    <div className="col-4">
                      <img src={this.state.pt1.img_url} className="partShow" alt="pt1" />
                    </div>
                  </div>
                  <p>Attack: {this.state.el1.attack + this.state.fd1.attack + this.state.pt1.attack}&nbsp;
                  Defense: {this.state.el1.defense + this.state.fd1.defense + this.state.pt1.defense}&nbsp;
                  Stamina: {this.state.el1.stamina + this.state.fd1.stamina + this.state.pt1.stamina}&nbsp;
                  Weight: {this.state.el1.weight_stat + this.state.fd1.weight_stat + this.state.pt1.weight_stat}&nbsp;
                  Speed: {this.state.el1.speed + this.state.fd1.speed + this.state.pt1.speed}&nbsp;
                  Burst: {this.state.el1.burst}</p>
                </div>
                <div className="col-md-6">
                    <h3>Beyblade 2</h3>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.el2.img_url} className="partShow" alt="el2" />
                      </div>
                      <div className="col-8">
                        <input value={this.state.el2Input} onChange={this.handleChange} id="el2Input" class="form-control" aria-describedby="el2" placeholder="Energy Layer Name" name="el2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.fd2.img_url} className="partShow" alt="fd2" />
                      </div>
                      <div className="col-8">
                        <input value={this.state.fd2Input} onChange={this.handleChange} id="fd2Input" class="form-control" aria-describedby="fd2" placeholder="Forge Disc Name" name="fd2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center form-row">
                      <div className="col-4">
                        <img src={this.state.pt2.img_url} className="partShow" alt="pt2" />
                      </div>
                      <div className="col-8">
                        <input value={this.state.pt2Input} onChange={this.handleChange} id="pt2Input" class="form-control" aria-describedby="pt2" placeholder="Forge Disc Name" name="pt2"/>
                      </div>
                    </div>
                    <p>Attack: {this.state.el2.attack + this.state.fd2.attack + this.state.pt2.attack}&nbsp;
                    Defense: {this.state.el2.defense + this.state.fd2.defense + this.state.pt2.defense}&nbsp;
                    Stamina: {this.state.el2.stamina + this.state.fd2.stamina + this.state.pt2.stamina}&nbsp;
                    Weight: {this.state.el2.weight_stat + this.state.fd2.weight_stat + this.state.pt2.weight_stat}&nbsp;
                    Speed: {this.state.el2.speed + this.state.fd2.speed + this.state.pt2.speed}&nbsp;
                    Burst: {this.state.el2.burst}</p>
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
