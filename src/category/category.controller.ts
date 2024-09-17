import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CategoryService } from './category.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'enums/role.enum';
import { Category } from './entities/category.entity';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Category')
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findByPaginate(@Query() query: FilterCategoryDto): Promise<Category[]> {
    return await this.categoryService.findByPaginate(query);
  }

  @Roles(Role.Admin)
  @Get('all')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOneById(@Param('id') id: number): Promise<Category | undefined> {
    return await this.categoryService.findOneById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createUserDto: CreateCategoryDto) {
    return await this.categoryService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() createUserDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return await this.categoryService.update(createUserDto, id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoryService.delete(id);
  }
}
