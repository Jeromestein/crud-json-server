import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Lists extends React.Component {
  render() {
    let listrows = [];
    
    // Generate table rows from props.alldata
    this.props.alldata.forEach((element, index) => {
      listrows.push(
        <tr key={element._id}>
          <td className="fw-bold text-primary">{index + 1}</td>
          <td className="fw-medium">{element.title}</td>
          <td className="text-muted">{element.author}</td>
          <td>
            <button 
              className="btn btn-warning btn-sm me-2"
              onClick={() => this.props.handleUpdate(element)}
              title="Edit this book"
            >
              <i className="bi bi-pencil-square"></i> Edit
            </button>
          </td>
          <td>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => this.props.handleDelete(element._id)}
              title="Delete this book"
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-book"></i> Books List
            <span className="badge bg-light text-dark ms-2">{this.props.alldata.length}</span>
          </h4>
        </div>
        <div className="card-body p-0">
          {this.props.alldata.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-book display-1 text-muted"></i>
              <h5 className="mt-3 text-muted">No books found</h5>
              <p className="text-muted">Add your first book to get started!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">Title</th>
                    <th className="border-0">Author</th>
                    <th className="border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listrows}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Lists;