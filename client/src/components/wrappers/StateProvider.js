import React, { Component } from 'react';
import axios from 'axios';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import Loader from 'react-loader-spinner';
// import toast from 'react-hot-toast';

class StateProvider extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      mode: MODE_CREATE,
      filter: FILTER_ALL,
      list: [],
      loader: false,
    };
  }

  async componentDidMount() {
    const AUTH_TOKEN = `Bearer ${this.props.token}`;
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

    this.setState({ loader: true });
    try {
      const res = await axios.get('/tasks?sortBy=createdAt:asc');
      this.setState({
        list: res.data,
      });
    } catch (err) {
      this.props.history.push('/');
    } finally {
      this.setState({ loader: false });
    }
  }

  render() {
    let children = wrapChildrenWith(this.props.children, {
      data: this.state,
      actions: objectWithOnly(this, [
        'addNew',
        'changeFilter',
        'changeStatus',
        'changeMode',
        'setSearchQuery',
        'deleteItem',
      ]),
    });

    return (
      <div>
        {children}
        {this.state.loader ? (
          <Loader
            className="loader"
            type="Grid"
            color="#808080"
            height={40}
            width={40}
          />
        ) : null}
      </div>
    );
  }

  async addNew(text) {
    const data = { description: text };
    this.setState({ loader: true });
    const res = await axios.post('/tasks', data);
    this.setState({ loader: false });
    this.setState(prevState => ({
      list: prevState.list.concat([res.data]),
    }));
    // let updatedList = addToList({description: text}, this.props.token, this.state.list);
    // this.setState({list: updatedList});
  }

  changeFilter(filter) {
    this.setState({ filter });
  }

  async changeStatus(itemId, completed) {
    const data = { completed };
    this.setState({ loader: true });
    const res = await axios.patch(`/tasks/${itemId}`, data);
    this.setState({ loader: false });
    // const updatedList = updateStatus(this.state.list, itemId, completed);
    const updateState = prevState => {
      const updatedList = prevState.list.filter(item => item._id !== itemId);
      return updatedList.concat(res.data);
    };

    this.setState(prevState => ({
      list: updateState(prevState),
    }));
  }

  changeMode(mode = MODE_NONE) {
    this.setState({ mode });
  }

  setSearchQuery(text) {
    this.setState({ query: text || '' });
  }

  async deleteItem(id) {
    this.setState({ loader: true });
    const _res = await axios.delete(`/tasks/${id}`);
    this.setState({ loader: false });
    this.setState(prevState => ({
      list: prevState.list.filter(item => item._id !== id),
    }));
    // deleteItemById(id)
    // this.setState({ list: getAll() })
  }
}

export default StateProvider;
