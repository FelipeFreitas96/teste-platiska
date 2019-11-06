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

class TaskEditModal extends Component {
  constructor(props) {
    super(props);
    this.titleRef = null;
    this.contentRef = null;
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

  save() {
    const { addTodo } = this.props;
    addTodo({
      title: this.titleRef.value,
      content: this.contentRef.value,
    });
    this.toggle();
  }

  render() {
    const { todos } = this.props;
    return (
      <Modal
        className="taskreadmodal"
        title={todos.title}
        isOpen={todos.visible && todos.type === 'add'}
        onAfterOpen={this.handleOnAfterOpenModal}
        onRequestClose={() => this.toggle()}
        askToClose={() => this.toggle()}
      >
        <div className="taskmodal-modal">
          <div className="taskmodal-board">
            <div className="taskmodal-title">
              <input type="text" ref={(input) => { this.titleRef = input; }} />
              <div className="taskmodal-close" onClick={() => this.toggle()} />
            </div>
            <div className="taskmodal-content">
              <textarea ref={(input) => { this.contentRef = input; }} />
            </div>
          </div>
          <div className="taskmodal-buttons">
            <input type="button" value="Cancelar" onClick={() => this.toggle()} />
            <input type="button" value="Salvar" onClick={() => this.save()} />
          </div>
        </div>
      </Modal>
    );
  }
}

TaskEditModal.propTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  addTodo: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(TodosCreator, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditModal);
