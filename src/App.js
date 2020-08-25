import React from 'react';
import './App.css';
import TableRender from './components/table'
import NewPostModal from './components/newPostModal'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      postings: [],
    }
    
    this.fetchData = this.fetchData.bind(this);
    this.updateList = this.updateList.bind(this);
  }
  fetchData (){
    const url = "https://localhost:44345/Postings";
    
    fetch(url)
    .then(response => response.text())
    .then(contents => this.setState({postings: JSON.parse(contents)}, () => {
    }))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  updateList(res) {
    res.text().then((text) => {
      // do something with the text response
      if(text){
        console.log(text)
        const temp = this.state.postings.slice(0, this.state.postings.length)
        const parsedJson = JSON.parse(text)
        var isModified = false;
        temp.map((item) => {
          if(item["id"] === parsedJson["id"]) {
            item["title"] = parsedJson["title"]
            item["content"] = parsedJson["content"]
            isModified = true;
          }
        })
        if(!isModified){
          this.setState({postings: this.state.postings.concat(parsedJson)})
        }
        else
        {
          this.setState({postings: this.state.postings})
        }
      } 
    });
  }

  componentDidMount(){
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <h3>Welcome to the posting board!</h3>
        <div className="NewPost">
          <NewPostModal updateList={this.updateList}/>
        </div>
        <TableRender postings={this.state.postings}/>

        <div style={{padding: 10}}>
          <a href="https://localhost:44345/Postings?NOT=id,first_post">https://localhost:44345/Postings?NOT=id,first_post</a>
          <br/>
          <a href="https://localhost:44345/Postings?EQUAL=id,first_post">https://localhost:44345/Postings?EQUAL=id,first_post</a>
        </div>

      </div>
    );
  } 
}

export default App;
