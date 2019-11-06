/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as TodosCreator } from '../../store/ducks/todos';
// import api from '../../services/api';

const TodoList = ({ toggleModal, todos }) => (
  <ul className="todoList">
    {todos.data.map(({ id, title, content }) => (
      <li
        key={id.toString()}
        role="button"
        tabIndex="0"
        onClick={() => toggleModal({
          id, title, content, type: 'read',
        })}
        onKeyPress={() => toggleModal({
          id, title, content, type: 'read',
        })}
      >
        {title}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.shape({
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(TodosCreator, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
