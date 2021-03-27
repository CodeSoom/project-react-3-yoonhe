import reducer, { changeLoginFields } from './slice';

describe('reducer', () => {
  it('renders initial data', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
      },
    };

    const state = reducer(undefined, { type: 'none' });

    expect(state).toEqual(initialState);
  });

  describe('changeLoginField', () => {
    it('change loginFields', () => {
      const initialState = {
        loginFields: {
          email: '',
          password: '',
        },
      };

      const state = reducer(initialState, changeLoginFields({
        name: 'email',
        value: 'test@gmail.com',
      }));

      expect(state.loginFields.email).toBe('test@gmail.com');
    });
  });
});
