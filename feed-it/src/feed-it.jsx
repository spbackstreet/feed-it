import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};
class feedit extends Component {
  state = {
    title: [],
    feeds: [],
    title1: [],
    feeds1: [],
    Search:'',
    pubDate:'',
    link:'',
    description:"",
    content:'',
    conntentvis:false,
    displayhistory:false,
    feedHistory:[]
  }
  componentDidMount() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://sukhmanisakhi.com/feed/',
      {

      })
      .then((response) => response.json())
      .then((response) => {

        if (response.status = 'ok') {
          console.log(`Feed Response`, response)
          this.setState({
            title: response.feed,
            feeds: response.items
          })
          console.log(this.state.feeds)
        }


      })
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://aws.amazon.com/blogs/big-data/feed/',
      {

      })
      .then((response) => response.json())
      .then((response) => {

        if (response.status = 'ok') {
          console.log(`Feed Response`, response)
          this.setState({
            title1: response.feed,
            feeds1: response.items
          })
          console.log(this.state.feeds1)
        }


      })
  }
  onChange = e => {
    this.setState({
      Search: e.target.value
    });
  }
  viewUrl=(pubDate,link,description,content,title)=>{
    this.setState({
      conntentvis:true,
      pubDate: pubDate,
      link: link,
      description:description,
      content:content
    })
    this.state.feedHistory.unshift(title)

  }
  showhistory=()=>{
    console.log(this.state.feedHistory)
    this.setState({displayhistory : !this.state.displayhistory})
  }
  splicehostory=(index)=>{
    this.state.feedHistory.splice(index,1)
  }
  render = () => {
    var that=this;
    var modal = [];
    modal.push(
      <div className="modal" role="dialog" style={this.state.displayhistory ? display : hide}>
        <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 style={{"font-weight": "bold", color: "#fff"}}>History</h4>
          <a className="close" style={{"font-weight": "bold", color: "#fff"}}onClick={this.showhistory}>X</a>
        </div>
        <div className="modal-body">
        {this.state.feedHistory.map(function (item, key) {
          return (
        <p>{item}<a onClick={that.splicehostory.bind(that,item.index)}><h4>X</h4></a></p>)})}
         
			<h1 className="m-5">{this.state.taskName}</h1>
      <div>
     
  </div>
      </div>
      </div>
   
      </div>
      </div>
   );
    const { Search } = this.state;
    return (
      <Router>
      <div className="App">
        {modal}
        <aside>
          <div id="sidebar" className="nav-collapse yscroll">
            <ul className="sidebar-menu" id="nav-accordion">
              <li className="sub-menu mt"
              //onClick={this.showTaskDropdwnHandler.bind(this)}
              ><div onClick={this.showhistory} style={{"text-align":"end"}}> <a><b>History</b></a></div>
                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8"> <b>Search Feed</b>
                  <input type="text" placeholder="Search Feed Name" className="form-control mt-5px" id="taskname" onChange={this.onChange} autoComplete="off" />
                </div>
                <a href={this.state.title.link}> <i className="fa fa-tasks"></i> <span className="mt"><b>{this.state.title.title}</b></span> </a>

                <div>
                  <ul class="sub" >
                    {this.state.feeds.map(function (item, key) {
                        if ((Search !== "") &&
                        (item.title.toLowerCase().indexOf(Search.toLowerCase())) === -1) {
                        return null
                      }

                      return (
                        <li><a onClick={that.viewUrl.bind(that, item.pubDate, item.link,item.description,item.content,item.title)}>{item.title}</a></li>
                      )
                    })}
                  </ul>
                </div>
              </li>
              <li className="sub-menu mt"
              //onClick={this.showTaskDropdwnHandler.bind(this)}
              >
                <a href={this.state.title1.link}> <i className="fa fa-tasks"></i> <span className="mt"><b>{this.state.title1.title}</b></span> </a>

                <div>
                  <ul class="sub" >
                    {this.state.feeds1.map(function (item, key) {
                        if ((Search !== "") &&
                        (item.title.toLowerCase().indexOf(Search.toLowerCase())) === -1) {
                        return null
                      }

                      return (
                        <li><a onClick={that.viewUrl.bind(that, item.pubDate, item.link, item.description,item.content,item.title)}>{item.title}</a></li>
                      )
                    })}
                  </ul>
                </div>
              </li>
              
            </ul>
          </div>
        </aside>
        <section id="main-content">
            <section className="wrapper">
                {this.state.conntentvis?
              <div className="mt ml-240">
                <h3><i className="fa fa-angle-right"></i>{this.state.link}
        </h3>
                <hr />
                <h5>Date: {this.state.pubDate}</h5>
                <br/>
                Description : <br/>
                <iframe class="iframe" src={"data:text/html;,"+this.state.description}></iframe>
                <br/>
                Content : <br/>
                <iframe class="iframe" style={{height:'300px'}} src={"data:text/html;,"+this.state.content}></iframe>
                </div>:null}
                </section>
                </section>

      </div>
      </Router>
    );
  }

}



export default feedit;
