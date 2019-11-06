/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { Creators as TodosCreator } from '../../store/ducks/todos';
import './style.css';

Modal.defaultStyles.overlay.backgroundColor = '#00000090';
Modal.setAppElement('*');

class TaskReadModal extends Component {
  toggle(type = 'read') {
    const { toggleModal, todos } = this.props;
    toggleModal({
      id: todos.id,
      title: todos.title,
      content: todos.content,
      type,
    });
  }

  delete() {
    const { removeTodo, todos } = this.props;
    removeTodo(todos.id);
    this.toggle();
  }

  edit() {
    this.toggle('edit');
  }

  render() {
    const { todos } = this.props;
    return (
      <Modal
        className="taskreadmodal"
        title={todos.title}
        isOpen={todos.visible && todos.type === 'read'}
        onAfterOpen={this.handleOnAfterOpenModal}
        onRequestClose={() => this.toggle()}
        askToClose={() => this.toggle()}
      >
        <div className="taskmodal-modal">
          <div className="taskmodal-board">
            <div className="taskmodal-title">
              <span>{todos.title}</span>
              <div className="taskmodal-close" onClick={() => this.toggle()} />
            </div>
            <div className="taskmodal-content">
              <span>{todos.content}</span>
            </div>
          </div>
          <div className="taskmodal-buttons">
            <input type="button" value="Deletar" onClick={() => this.delete()} />
            <input type="button" value="Editar" onClick={() => this.edit()} />
          </div>
        </div>
      </Modal>
    );
  }
}

TaskReadModal.propTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(TodosCreator, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskReadModal);
