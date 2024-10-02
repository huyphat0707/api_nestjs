import { RolesGuard } from './../roles/roles.guard';
import { AuthGuard } from './../auth/auth.guard';
import { storageConfig } from '../../helpers/config';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { extname } from 'path';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { FilterPostDto } from './dto/filter-post.dto';

@Controller('api/posts')
@ApiTags('Post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve posts public',
    description: `
      This endpoint retrieves a list of posts with optional pagination and filtering.
      - **page**: The page number to retrieve (default is 1).
      - **items_per_page**: The number of items per page (default is 10).
      - **search**: A search term to filter posts by title or content.
      - **category**: The category ID to filter posts by category.
    `,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  async findByPaginate(@Query() query: FilterPostDto): Promise<PostEntity[]> {
    return await this.postService.findByPaginate(query);
  }

  @ApiOperation({
    summary: 'Retrieve posts detail public',
  })
  @Get(':id')
  findDetail(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOneById(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Create a new post with an optional thumbnail image',
    description: `
      This endpoint allows you to create a new post with a thumbnail image.
      The request must include a file upload for the thumbnail and the post details.
    `,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Post details with an optional thumbnail image',
    type: CreatePostDTO,
    schema: {
      type: 'object',
      properties: {
        ...CreatePostDTO,
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: 'Thumbnail image for the post',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation errors or file errors',
  })
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('posts'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  async createPost(
    @Body() payload: CreatePostDTO,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return await this.postService.createPost(
      { ...payload, thumbnail: file.destination + '/' + file.filename },
      req.user.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('post'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updatePostDto: UpdatePostDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (file) {
      updatePostDto.thumbnail = file.destination + '/' + file.filename;
    }

    return this.postService.update(Number(id), updatePostDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }
}
