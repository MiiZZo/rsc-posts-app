import { Test } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { UserPost } from '../posts.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PostsService', () => {
  const simplePost = {
    title: 'Title',
    body: 'Body',
    userId: '1',
  };
  let postsService: PostsService;
  let postsRepositoryMock: {
    create: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
  };

  beforeEach(async () => {
    postsRepositoryMock = {
      create: jest.fn().mockImplementation(() => ({ ...simplePost, user: { id: simplePost.userId } })),
      save: jest.fn().mockImplementation(() => simplePost),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(UserPost),
          useValue: postsRepositoryMock,
        }
      ]
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
  });

  describe('createOne', () => {
    it('should call postsRepository create and save methods once with correct params', async () => {
      const {
        body,
        title,
        userId,
      } = simplePost;
      const result = await postsService.createOne(simplePost)

      expect(result).toEqual(expect.objectContaining(simplePost));
      expect(postsRepositoryMock.create).toBeCalledTimes(1);
      expect(postsRepositoryMock.create).toBeCalledWith({ title, body, user: { id: userId } });
      expect(postsRepositoryMock.save).toBeCalledTimes(1);
      expect(postsRepositoryMock.save).toBeCalledWith(
        expect.objectContaining({
          title,
          body,
          user: {
            id: userId,
          },
        }),
      );
    });
  });
});
