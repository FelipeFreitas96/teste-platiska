import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as TodosCreator } from './store/ducks/todos';
import './App.css';
import TaskReadModal from './components/TaskReadModal/index';
import TaskAddModal from './components/TaskAddModal/index';
import TaskEditModal from './components/TaskEditModal/index';
import TodoList from './components/TodoList/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggle() {
    const { toggleModal } = this.props;
    toggleModal({
      id: 0,
      title: '',
      content: '',
      type: 'add',
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <span>Task List</span>
        </div>
        <TaskReadModal />
        <TaskAddModal />
        <TaskEditModal />
        <div>
          <TodoList modal={this.modalRef} />
          <div className="addButton" onClick={() => { this.toggle(); }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(TodosCreator, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
