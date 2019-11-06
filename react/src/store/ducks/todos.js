export const Types = {
  TOGGLE_MODAL: 'todo/TOGGLE_MODAL',
  ADD_TODO: 'todo/ADD_TODO',
  EDIT_TODO: 'todo/EDIT_TODO',
  REMOVE_TODO: 'todo/REMOVE_TODO',
};

const INITIAL_STATE = {
  data: [],
  id: 0,
  type: '',
  title: '',
  content: '',
  visible: false,
};

export default function todos(state = INITIAL_STATE, action) {
  const { data } = state;
  switch (action.type) {
    case Types.EDIT_TODO:
      data[action.payload.id] = action.payload;
      return { ...state, data };
    case Types.REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((res) => res.id !== action.payload.id),
      };
    case Types.TOGGLE_MODAL:
      return {
        ...state,
        id: action.payload.id,
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content,
        visible: action.payload.type === state.type ? !state.visible : true,
      };
    case Types.ADD_TODO:
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: state.data.length,
            title: action.payload.title,
            content: action.payload.content,
          },
        ],
      };
    default:
      return state;
  }
}

export const Creators = {
  toggleModal: ({
    id, type, title, content,
  }) => ({
    type: Types.TOGGLE_MODAL,
    payload: {
      id,
      type,
      title,
      content,
    },
  }),
  editTodo: ({ id, title, content }) => ({
    type: Types.EDIT_TODO,
    payload: {
      id,
      title,
      content,
    },
  }),
  addTodo: ({ title, content }) => ({
    type: Types.ADD_TODO,
    payload: {
      title,
      content,
    },
  }),
  removeTodo: (id) => ({
    type: Types.REMOVE_TODO,
    payload: {
      id,
    },
  }),
};
