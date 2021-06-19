import { authenticateUser, createUser, deleteUser, getUserById, getUsers, updateUser } from "./user-controller";

describe('User controller tests', () => {
    let request: any;
    let response: any;

    beforeEach(() => {
        response = {
            status: jest.fn(() => response),
            json: jest.fn(() => response),
            send: jest.fn(() => response),
        };
        request = {
            body: {},
            params: {},
            query: {},
        };
    });

    describe('createUser should', () => {
        it('return new user if it doesn\'t exist', async () => {
            const newUser = {
                login: 'log-test-1',
                password: 'pass-1',
            };
            request.body = newUser;
            await createUser(request, response);
            const call = response.json.mock.calls[0]?.[0];
            expect(call.login).toBe(newUser.login);
            expect(call.password).toBe(newUser.password);
        });

        it('return status 409 if user with the provided login already exists', async () => {
            const newUser = {
                login: 'log-test-2',
                password: 'pass-1',
            };
            request.body = newUser;
            await createUser(request, response);
            await createUser(request, response);
            expect(response.status).toHaveBeenCalledWith(409);
        });
    });

    it('getUserById should return user', async () => {
        request.params = {
            id: '0',
        };
        await getUserById(request, response);
        const call = response.json.mock.calls[0]?.[0];
        expect(call.login).toBe('Calderon');
    });

    it('getUsers should return users', async () => {
        request.query = {
            limit: 2,
        };
        await getUsers(request, response);
        const call = response.json.mock.calls[0]?.[0];
        expect(call.length).toBe(2);
    });

    it('updateUser should update user', async () => {
        request.params = {
            id: '13',
        };
        request.body = {
            login: 'Mandy-2',
        };
        await updateUser(request, response);
        const call = response.json.mock.calls[0]?.[0];
        expect(call.login).toBe('Mandy-2');
    });

    it('deleteUser should softly delete user', async () => {
        request.params = {
            id: '2',
        };
        await deleteUser(request, response);
        const call = response.json.mock.calls[0]?.[0];
        expect(call.login).toBe('Vasquez');
        expect(call.isDeleted).toBe(true);
    });

    it('authenticateUser should return token for the correct login/password', async () => {
        request.body = {
            login: 'Celia',
            password: '123',
        };
        await authenticateUser(request, response);
        const call = response.send.mock.calls[0]?.[0];
        const strings = call.split('.');
        expect(strings.length).toBe(3);
    });

    it('authenticateUser should return 403 status for wrong login/password', async () => {
        request.body = {
            login: 'Celia',
            password: '12345',
        };
        await authenticateUser(request, response);
        const call = response.status.mock.calls[0]?.[0];
        expect(call).toBe(403);
    });
});
