import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Lists extends React.Component {
  render() {
    let listrows = [];
    
    // Generate table rows from props.alldata
    // this.props.alldata.forEach(element => {
    this.props.alldata.forEach((element, index) => {
      listrows.push(
        <tr key={element._id}>
          {/* <td>{element.id}</td> */}
          <td>{index + 1}</td>
          <td>{element.title}</td>
          <td>{element.author}</td>
          <td>
            <button 
              className="btn btn-warning btn-sm"
              onClick={() => this.props.handleUpdate(element)}
            >
              Update
            </button>
          </td>
          <td>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => this.props.handleDelete(element._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="container mt-4">
        <h1>Lists</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {listrows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Lists;