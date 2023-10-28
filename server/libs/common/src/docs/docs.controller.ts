import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class DocsController {
  @Get('/')
  @Redirect('/docs')
  redirect() {}
}
