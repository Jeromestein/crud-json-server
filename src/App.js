import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }

  getLists=()=> {
    fetch("http://localhost:5001/posts")
      .then(response => response.json())
      .then(result => 
        this.setState({ 
          loading: false, 
          alldata: result 
        })
      )
      .catch(error => console.log(error));
  }

  handleChange = (event) => {
    let title = this.state.singledata.title;
    let author = this.state.singledata.author;
    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;

    this.setState({
      singledata: {
        title: title,
        author: author
      }
    });
  }

  createList = () => {
    fetch("http://localhost:5001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    }).then(
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      })
    );
  }

  render() {
    const listTable = this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <Lists alldata={this.state.alldata} />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getLists}
          >
            Get Lists
          </button>
          <CreateList 
            singledata={this.state.singledata} 
            handleChange={this.handleChange}
            handleCreate={this.createList}
          />
        </span>
        {listTable}
      </div>
    );
  }
}

export default App;