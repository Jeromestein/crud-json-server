import React from "react";
import Lists from "./Lists";

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
        </span>
        {listTable}
      </div>
    );
  }
}

export default App;