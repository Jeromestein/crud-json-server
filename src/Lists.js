import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Lists extends React.Component {
  render() {
    let listrows = [];
    
    // Generate table rows from props.alldata
    this.props.alldata.forEach(element => {
      listrows.push(
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.title}</td>
          <td>{element.author}</td>
          <td>
            <button className="btn btn-warning btn-sm">Update</button>
          </td>
          <td>
            <button className="btn btn-danger btn-sm">Delete</button>
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