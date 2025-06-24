//@ts-nocheck
import { transaction, query } from '../../db/connection.js';
import group from '../../db/groups.js';
import crypto from 'crypto';
jest.mock('crypto');
jest.mock('../../db/connection.js');

describe('add group function', ()=>{
    const mockTransaction = transaction;
    const mockGroupId = 123;
    const mockGroup = {
        id: mockGroupId,
        name: 'test',
        inviteCode: 'abc123def4'
    }

    beforeEach(()=>{
        jest.clearAllMocks();
    });
    crypto.randomBytes.mockReturnValue({
        toString: () => 'abc123def4'
    });

    mockTransaction.mockImplementation(
        async (inTransaction, afterCommit) => {
            const mockConn = {
                execute: jest.fn()
                    .mockResolvedValueOnce([{ insertId: mockGroupId }])
                    .mockResolvedValueOnce([{}])                       
            };

            const insertId = await inTransaction(mockConn);
            mockConn.execute = jest.fn().mockResolvedValueOnce([[mockGroup]]);

            return await afterCommit(mockConn, insertId);
        }
    );

    it('positive case', async ()=>{
        const result = await group.add(mockGroup.name, mockGroup.id);
        expect(result).toEqual([mockGroup]);
        expect(transaction).toHaveBeenCalledTimes(1);
        expect(crypto.randomBytes).toHaveBeenCalledWith(5)
    })
})