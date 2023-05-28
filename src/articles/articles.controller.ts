import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ArticleEntity } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiCreatedResponse({ type: ArticleEntity, isArray: true })
  findAllDrafts() {
    return this.articlesService.findAllDrafts();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return this.articlesService.remove(+id);
  }
}
