import { unlink } from 'fs/promises';

import { Controller, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { AssetService } from '@/business/asset/asset.service';

import { UserJwtAuthGuard } from '../shared/guards/user.guard';

@Controller('upload')
export class uploadController {
  constructor(private readonly assetService: AssetService) {}

  @UseGuards(UserJwtAuthGuard)
  @Post('')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Res() res: Response
  ) {
    const assetUploadPromises = files.map(async file => {
      return this.assetService.create(file);
    });

    const result = await Promise.all(assetUploadPromises);

    // remove files from disk after upload
    await Promise.all(
      files.map(async file => {
        await unlink(file.path);
      })
    );

    return res.status(200).json(result);
  }
}
