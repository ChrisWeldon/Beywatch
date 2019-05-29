import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart';

function nat(val){
  if(val<0){
    return(0)
  }else{
    return(val)
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.api_server = "http://api.beybladematch.com"
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
      fetch(this.api_server + '/api/part/all', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      }).then(res => res.json())
      .then(res => {
        if(res.length ==0 ){
          console.log("sql query empty")
        }else{
          this.setState({
            el1: res[0][0],
            el1Results: res[0],
            el2: res[0][0],
            el2Results: res[0],
            fd1: res[1][0],
            fd1Results: res[1],
            fd2: res[1][0],
            fd2Results: res[1],
            pt1: res[2][0],
            pt1Results: res[2],
            pt2: res[2][0],
            pt2Results: res[2],
            el1Input:"",
            el2Input:"",
            fd1Input:"",
            fd2Input:"",
            pt1Input:"",
            pt2Input:""
          }, function(){
              this.getMatchData();
          })
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let ret_data = {}
    const data = new FormData(event.target);
    for(var pair of data.entries()) {
      ret_data[pair[0]] = pair[1]
    }

    console.log(ret_data)

    fetch(this.api_server+ '/api/', {
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
    let val = event.target.value;
    let type;
    let name = event.target.name;
    let id = event.target.id
    if(name.includes("el")){
      type = "Energy Layer";
    } else if(name.includes("fd")){
      type = "Forge Disc"
    } else{
      type="Performance Tip"
    }

    let obj = {}
    obj[id] = val
    this.setState(obj)

    fetch(this.api_server + '/api/part', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({part_type:type, query:val})
    }).then(res => res.json())
    .then(res => {
      if(res.length ==0 ){
        console.log("sql query empty")
        let obj = {};
        //obj[id] = val;
        this.setState(obj, function(){
          this.getMatchData();
        });
      }else{
        let obj = {};
        //obj[id] = val;
        obj[name] = res[0]
        obj[name+'Results'] = res
        this.setState(obj, function(){
          this.getMatchData();
        })
      }
    });
  }

  getMatchData(){
    console.log("GETTING MATCH DATA")
    fetch(this.api_server+ '/api/match/', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        el1: this.state.el1.part_id,
        el2: this.state.el1.part_id,
        fd1: this.state.fd1.part_id,
        fd2: this.state.fd2.part_id,
        pt1: this.state.pt1.part_id,
        pt2: this.state.pt2.part_id
      })

    }).then(res => res.json())
      .then(res => {
          console.log(res)
          this.setState({model:res})
      })
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
    fetch(this.api_server + '/api/part', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({part_type:type, query:val})
    }).then(res => res.json())
    .then(res => {
      if(res.length ==0 ){
        console.log("sql query empty")
        let obj = {};
        obj[id] = val;
        this.setState(obj, function(){
          this.getMatchData();
        });
      }else{
        let obj = {};
        obj[id] = val;
        obj[name] = res[0]
        obj[name+'Results'] = res
        this.setState(obj, function(){
          this.getMatchData();
        })
      }
    });
  }

  renderPart(pt, q, part){
    fetch('this.api_server/api/part', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({part_type:pt, query:q})
    }).then(res => res.json())
    .then(res => {
      let obj = {};
      obj[part] = res[0]
      this.setState(obj)
    });
  }

  returnQueriedMenuList(part){
    let ret_array = []
    for(let i=0; i<this.state[part+"Results"].length;i++){
      ret_array.push(<span><a id={part+"Input"} name={part} className="btn" onClick={this.handleOptionClick}>{this.state[part+"Results"][i].name_hasbro}</a><br/></span>)
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
          <form className="col-md-12">
            <div className="row">
              <div className="col-md-6">

                  <div className="form-group align-items-center part-row form-row">
                    <div className="col-4">
                      <input value={this.state.el1Input} onChange={this.handleChange} id="el1Input" class="form-control form-control-lg" aria-describedby="el1" placeholder="Energy Layer Name" name="el1"/>
                    </div>
                    <div className="col-sm-4 scrollable-menu">
                      <div className="">
                        {this.returnQueriedMenuList("el1")}
                      </div>
                    </div>
                    <div className="col-4">
                      <img src={this.state.el1.img_url} className="partShow" alt="el1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center part-row form-row">
                    <div className="col-4">
                      <input value={this.state.fd1Input} onChange={this.handleChange} id="fd1Input" class="form-control form-control-lg" aria-describedby="fd1" placeholder="Forge Disc Name" name="fd1"/>
                    </div>
                    <div className="col-4 scrollable-menu">
                      <div className="">
                        {this.returnQueriedMenuList("fd1")}
                      </div>
                    </div>
                    <div className="col-4">
                      <img src={this.state.fd1.img_url} className="partShow" alt="fd1" />
                    </div>
                  </div>
                  <div className="form-group align-items-center part-row form-row">
                    <div className="col-4">
                      <input value={this.state.pt1Input} onChange={this.handleChange} id="pt1Input" class="form-control form-control-lg" aria-describedby="pt1" placeholder="Performance Tip Name" name="pt1"/>
                    </div>
                    <div className="col-4 scrollable-menu">
                      <div className="">
                        {this.returnQueriedMenuList("pt1")}
                      </div>
                    </div>
                    <div className="col-4">
                      <img src={this.state.pt1.img_url} className="partShow" alt="pt1" />
                    </div>
                  </div>
                  <p>Attack: {nat(this.state.el1.attack) + nat(this.state.fd1.attack) + nat(this.state.pt1.attack)}&nbsp;
                  Defense: {nat(this.state.el1.defense) + nat(this.state.fd1.defense) + nat(this.state.pt1.defense)}&nbsp;
                  Stamina: {nat(this.state.el1.stamina) + nat(this.state.fd1.stamina) + nat(this.state.pt1.stamina)}&nbsp;
                  Weight: {nat(this.state.el1.weight_stat) + nat(this.state.fd1.weight_stat) + nat(this.state.pt1.weight_stat)}&nbsp;
                  Speed: {nat(this.state.el1.speed) + nat(this.state.fd1.speed) + nat(this.state.pt1.speed)}&nbsp;
                  Burst: {nat(this.state.el1.burst)}</p>
                  <h3>{(this.state.model ? this.state.model.prob[0] : 0)}%</h3>
                </div>
                <div className="col-md-6">
                    <div className="form-group align-items-center part-row form-row">
                      <div className="col-4 justify-content-center">
                        <img src={this.state.el2.img_url} className="partShow" alt="el2" />
                      </div>
                      <div className="col-4 scrollable-menu justify-content-center">
                        <div className="">
                          {this.returnQueriedMenuList("el2")}
                        </div>
                      </div>
                      <div className="col-4 justify-content-center">
                        <input value={this.state.el2Input} onChange={this.handleChange} id="el2Input" class="form-control form-control-lg" aria-describedby="el2" placeholder="Energy Layer Name" name="el2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center part-row form-row">
                      <div className="col-4 justify-content-center">
                        <img src={this.state.fd2.img_url} className="partShow" alt="fd2" />
                      </div>
                      <div className="col-4 scrollable-menu justify-content-center">
                        <div className="">
                          {this.returnQueriedMenuList("fd2")}
                        </div>
                      </div>
                      <div className="col-4 justify-content-center">
                        <input value={this.state.fd2Input} onChange={this.handleChange} id="fd2Input" class="form-control form-control-lg" aria-describedby="fd2" placeholder="Forge Disc Name" name="fd2"/>
                      </div>
                    </div>
                    <div className="form-group align-items-center part-row form-row">
                      <div className="col-4 justify-content-center">
                        <img src={this.state.pt2.img_url} className="partShow" alt="pt2" />
                      </div>
                      <div className="col-4 scrollable-menu justify-content-center">
                        <div className="">
                          {this.returnQueriedMenuList("pt2")}
                        </div>
                      </div>
                      <div className="col-4">
                        <input value={this.state.pt2Input} onChange={this.handleChange} id="pt2Input" class="form-control form-control-lg" aria-describedby="pt2" placeholder="Performace Tip Name" name="pt2"/>
                      </div>
                    </div>
                    <p>Attack: {this.state.el2.attack + this.state.fd2.attack + this.state.pt2.attack}&nbsp;
                    Defense: {this.state.el2.defense + this.state.fd2.defense + this.state.pt2.defense}&nbsp;
                    Stamina: {this.state.el2.stamina + this.state.fd2.stamina + this.state.pt2.stamina}&nbsp;
                    Weight: {this.state.el2.weight_stat + this.state.fd2.weight_stat + this.state.pt2.weight_stat}&nbsp;
                    Speed: {this.state.el2.speed + this.state.fd2.speed + this.state.pt2.speed}&nbsp;
                    Burst: {this.state.el2.burst}</p>
                    <h3>{(this.state.model ? this.state.model.prob[1] : 0)}%</h3>
                  </div>
                </div>
            </form>
            <div className="row justify-content-center">
              <div clasName="col-md-6 justify-content-center">
                <BarChart data={[nat(this.state.el1.defense),2,3,4,nat(this.state.el1.attack),6]} width={700} height={100}/>
              </div>
              <div clasName="col-md-6 justfy-content-center">
                <BarChart data={[nat(this.state.el1.defense),2,3,4,nat(this.state.el1.attack),6]} width={700} height={100}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default App;
