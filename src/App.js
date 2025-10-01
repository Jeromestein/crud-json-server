import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }

  componentDidMount() {
    this.getLists();
  }

  getLists=()=> {
    fetch("http://localhost:5001/api/books")
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
    fetch("http://localhost:5001/api/books", {
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
    ).then(() => {
      // Refresh the list after creating a new book
      this.getLists();
    });
  }

  updateList = (book) => {
    this.setState({
      singledata: {
        title: book.title,
        author: book.author
      }
    });
  }

  deleteList = (id) => {
    fetch(`http://localhost:5001/api/books/${id}`, {
      method: "DELETE"
    }).then(() => {
      this.getLists();
    });
  }

  render() {
    const listTable = this.state.loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <Lists 
        alldata={this.state.alldata} 
        handleUpdate={this.updateList}
        handleDelete={this.deleteList}
      />
    );

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Book Management</h1>
              <CreateList 
                singledata={this.state.singledata} 
                handleChange={this.handleChange}
                handleCreate={this.createList}
              />
            </div>
            {listTable}
          </div>
        </div>
      </div>
    );
  }
}

export default App;