import getState from '../store/flux';

describe('Logout Function', () => {
    test('logout should clear access_token and set isLoggedIn to false', () => {
        const { actions } = getState({});

        global.localStorage = {
            removeItem: jest.fn()
        };

        actions.logout();

        expect(localStorage.removeItem).toHaveBeenCalledWith("access_token");

        const updatedStore = getState({}).store;
        expect(updatedStore.isLoggedIn).toBe(false);
        expect(updatedStore.userData).toBe(null);
        expect(updatedStore.message).toBe(null);
    });
});