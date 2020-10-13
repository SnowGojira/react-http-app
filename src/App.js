import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const apiURL = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };
  
  async componentDidMount(){
     const {data:posts} = await axios.get(apiURL);
     this.setState({posts});
  }

  handleAdd = async () => {
    const obj = {title:"a",body:"b"};
    const {data:post} = await axios.post(apiURL,obj);

    const posts=[post,...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "UPDATED!";
    await axios.put(`${apiURL}/${post.id}`, post);
    
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({posts});
  };

  handleDelete = async post => {
    await axios.delete(`${apiURL}/${post.id}`);

    const posts = this.state.posts.filter(p=>p.id!==post.id);
    this.setState({posts});
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
