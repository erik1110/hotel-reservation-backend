import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags('Article')
@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get All article',})
    @ApiOkResponse({})
    async getAllArticle() {
        return await this.articleService.getAllArticles();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get One article',})
    @ApiOkResponse({})
    async getOneArticles(@Param() params) {
        return await this.articleService.getOneArticle(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({summary: 'Create one article',})
    @ApiBearerAuth()
    @ApiCreatedResponse({})
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        console.log("createArticle")
        return await this.articleService.createArticle(createArticleDto);
    }


    // @Put(':id')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    // @Roles('admin')
    // @ApiOperation({summary: 'Update one article by id ( all params )',})
    // @ApiBearerAuth()
    // @ApiOkResponse({})
    // async updateWithAllParams(@Param() params, @Body() createArticleDto: CreateArticleDto) {
    //     return await this.articleService.updateArticlePut(params.id, createArticleDto);
    // }

    // @Delete(':id')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    // @Roles('admin')
    // @ApiOperation({summary: 'Delete one article',})
    // @ApiBearerAuth()
    // @ApiOkResponse({})
    // async deleteOneArticle(@Param() params) {
    //     return await this.articleService.deleteArticle(params.id);
    // }
}
