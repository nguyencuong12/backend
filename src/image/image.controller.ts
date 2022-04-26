import { Controller, Get, Res, Param } from '@nestjs/common';
import { join } from 'path';

@Controller('image')
export class ImageController {
  @Get(':imgPath')
  async fetchImage(@Res() res, @Param('imgPath') image) {
    // let path = join(__dirname, `../../uploads/${params.path}`);
    // return res.sendFile(image, { root: './files' });
    return res.sendFile(image, { root: './uploads' });

    // return res.sendFile(image, { root: './uploads' });
    // const product = await this.productService.fetchProduct(params.id);
    // return response.status(HttpStatus.OK).json({ product: product });
  }
}
