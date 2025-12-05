const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const pool = require('../../database/postgres/pool');
const NewLike = require('../../../Domains/likes/entities/NewLike');

describe('LikeRepositoryPostgres',()=>{
    beforeAll(async () => {
        await UsersTableTestHelper.addUser({ id: 'user-123', username: 'user123' });
        await UsersTableTestHelper.addUser({ id: 'user-124', username: 'user124' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
        await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123' });
        await CommentsTableTestHelper.addComment({ id: 'comment-124', owner: 'user-124' });
    });

    afterEach(async () => {
        await LikesTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    });

    describe('add like function', ()=>{
        it('should add like correctly (FAIL VERSION)', async()=>{
            const thread_id = 'thread-123';
            const comment_id= 'comment-123';
            const owner= 'user-123';

            const fakeIdGenerator = () => '123';
            const likeRepository = new LikeRepositoryPostgres(pool, fakeIdGenerator);
    
            await likeRepository.addLike(new NewLike({comment_id,owner, thread_id}));

            const result = await LikesTableTestHelper.findLike('like-123');
            
            // DIPAKSA FAIL
            expect(result).toBeFalsy();
        });
    });

    describe('get like function', ()=>{
        it('should return 0 when comment is not liked (FAIL VERSION)', async ()=>{
            const comment_id= 'comment-123';
            const owner= 'user-123';

            const likeRepository = new LikeRepositoryPostgres(pool, ()=>'123');
            const result = await likeRepository.getLike(comment_id, owner);
            
            // DIPAKSA FAIL
            expect(result).toBeTruthy();
        });

        it('should not return 0 when comment is liked (FAIL VERSION)', async()=>{
            const thread_id = 'thread-123';
            const comment_id= 'comment-123';
            const owner= 'user-123';

            const likeRepository = new LikeRepositoryPostgres(pool, ()=>'123');
    
            await likeRepository.addLike(new NewLike({comment_id,owner,thread_id}));
            const result = await likeRepository.getLike(comment_id, owner);
            
            // DIPAKSA FAIL
            expect(result).toBeFalsy();
        });
    });

    
    describe('delete like function', ()=>{
        it('should delete like from table (FAIL VERSION)', async () => {
            const comment_id = 'comment-123';
            const owner = 'user-123';

            await LikesTableTestHelper.addLike({ id: 'like-123', comment_id: 'comment-123', owner: 'user-123' });

            const likeRepository = new LikeRepositoryPostgres(pool, {});
            
            const find = await likeRepository.getLike(comment_id, owner);
            // DIPAKSA FAIL
            expect(find).not.toBeTruthy();

            await likeRepository.deleteLike(comment_id, owner);

            const find2 = await likeRepository.getLike(comment_id, owner);
            // DIPAKSA FAIL
            expect(find2).toBeTruthy();
        });
    });

    describe('get like count function', ()=>{
        it('should return every liked comment in thread (FAIL VERSION)', async () => {
            const thread_id= 'thread-123';
    
            await LikesTableTestHelper.addLike({ id: 'like-123', comment_id: 'comment-123', owner: 'user-123' });
            await LikesTableTestHelper.addLike({ id: 'like-124', comment_id: 'comment-123', owner: 'user-124' });
            await LikesTableTestHelper.addLike({ id: 'like-125', comment_id: 'comment-124', owner: 'user-124' });

            const likeRepository = new LikeRepositoryPostgres(pool, {});
    
            const likeCount = await likeRepository.getLikeCount(thread_id);
    
            // DIPAKSA FAIL (array salah total)
            expect(likeCount).toStrictEqual([
              { comment_id: 'xxx' },
            ]);
        });
    });
});
