import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    details: [],
    formData: {
      id: '',
      firstname: '',
      lastname: '',
      department: ''
    },
    isUpdating: false,
    updatingId: null
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('http://localhost:8000')
      .then(res => {
        const data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:8000/${id}`)
      .then(() => {
        this.fetchData(); // Refresh data after deletion
      })
      .catch(err => {
        console.error('Error deleting data:', err);
      });
  }

  handleUpdate = (id, updatedData) => {
    axios.put(`http://localhost:8000/${id}/`, updatedData)
      .then(res => {
        console.log('Update successful:', res.data);
        this.fetchData(); // Refresh data after update
        this.setState({
          isUpdating: false,
          updatingId: null,
          formData: {
            id: '',
            firstname: '',
            lastname: '',
            department: ''
          }
        });
      })
      .catch(err => {
        console.error('Error updating data:', err);
      })
  };

  handlePost = (newData) => {
    axios.post('http://localhost:8000/', newData)
      .then(res => {
        console.log('Post successful:', res.data);
        this.fetchData(); // Refresh data after posting
        this.setState({
          formData: {
            id: '',
            firstname: '',
            lastname: '',
            department: ''
          }
        });
      })
      .catch(err => {
        console.error('Error posting data:', err);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, firstname, lastname, department } = this.state.formData;
    const newData = { id, firstname, lastname, department };

    if (this.state.isUpdating) {
      this.handleUpdate(this.state.updatingId, newData);
    } else {
      this.handlePost(newData);
    }
  }

  handleNew = () => {
    this.setState({
      isUpdating: false,
      updatingId: null,
      formData: {
        id: '',
        firstname: '',
        lastname: '',
        department: ''
      }
    });
  }

  handleEdit = (id) => {
    const userData = this.state.details.find(user => user.id === id);
    this.setState({
      isUpdating: true,
      updatingId: id,
      formData: {
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        department: userData.department
      }
    });
  }

  render() {
    return (
      <div className="container mx-auto px-10">
        <header className="text-center text-2xl font-semibold mb-4">Data generated from Django</header>
        <hr />
        <br />


        <div className="overflow-x-auto">
        <div className="text-center text-2xl font-semibold mb-4">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Department</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {this.state.details.map((output, id) => (
                <tr key={id}>
                  <td>{output.firstname}</td>
                  <td>{output.lastname}</td>
                  <td>{output.department}</td>
                  <td><button className="btn btn-outline btn-error" onClick={() => this.handleDelete(output.id)}>Delete</button></td>
                  <td><button className="btn btn-outline btn-success" onClick={() => this.handleEdit(output.id)}>Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <br />
      <form onSubmit={this.handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <input type="number" className="w-full" placeholder="ID" value={this.state.formData.id} onChange={this.handleChange} name="id" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="w-full" placeholder="First name" value={this.state.formData.firstname} onChange={this.handleChange} name="firstname" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="w-full" placeholder="Last name" value={this.state.formData.lastname} onChange={this.handleChange} name="lastname" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="w-full" placeholder="Department" value={this.state.formData.department} onChange={this.handleChange} name="department" />
          </label>
          <br />
          <hr />
          <br />
          <div className="text-center text-2xl font-semibold mb-4"><input className="btn btn-outline btn-warning" type="submit" value={this.state.isUpdating ? 'Update' : 'Add a new user'} /> </div>
        </form>

      </div>
    );
  }
}

export default App;