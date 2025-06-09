// @ts-nocheck
import auth from "../../middleware/auth.js";
import jwt from "jsonwebtoken";
jest.mock('jsonwebtoken');

const response = {
    status: jest.fn((x) => response),
    json: jest.fn((x) => x)
}
const request = {
    cookies: {}
}
const next = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

test('without token', async ()=>{
    await auth(request, response, next);
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
})
test('with valid token', async ()=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    let requestWithToken = request;
    requestWithToken.cookies.token = 'test';
    jwt.verify.mockResolvedValue(requestWithToken.cookies.token);

    await auth(requestWithToken, response, next);
    
    expect(response.json).toHaveBeenCalledTimes(0);
    expect(response.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(requestWithToken.user).toBe(requestWithToken.cookies.token);
})
test('with error', async ()=>{
    jwt.verify.mockImplementation(()=>{throw new Error()});
    await auth(request, response, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledTimes(1);
})
