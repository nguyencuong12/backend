import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  async test(@Res() response, @Query() query) {
    let { searchField } = query;
    let result = await this.searchService.excuteSearch(searchField);
    return response.status(HttpStatus.OK).json({ searchResults: result });
    // return response.status(HttpStatus.OK).json({ test: 'Hello' });
  }
}
