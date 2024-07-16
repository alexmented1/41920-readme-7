import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { TagEntity } from '@project/tags';
import { Tag } from '@project/types';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(dto: CreatePostDto, tags: TagEntity[]) {
    const newPost = PostFactory.createFromCreatePostDto(dto, tags);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string) {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string) {
    return this.postRepository.findById(id);
  }

  public async getAllPosts() {
    return this.postRepository.findAll();
  }

  public async updatePost(id: string, dto: UpdatePostDto, tags: TagEntity[]) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id «${id}» not found`);
    }

    post.title = dto.title;
    post.announce = dto.announce;
    post.description = dto.description;
    post.link = dto.link;
    post.description = dto.description;
    post.videoLink = dto.videoLink;
    post.postText = dto.postText;
    post.status = dto.status;
    post.photoLink = dto.photoLink;
    post.quoteText = dto.quoteText;
    post.quoteAuthor = dto.quoteAuthor;
    post.type = dto.type;
    post.tags = tags;

    await this.postRepository.update(post);

    return post;
  }
}
