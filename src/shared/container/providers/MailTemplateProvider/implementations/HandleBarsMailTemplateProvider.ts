import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'


class HandleBarsMailTemplateProvider implements IMailTemplateProvider{
  public async parse({file, variables}:IParseMailTemplateDTO): Promise<string>{
    const templateFileContect = await fs.promises.readFile(file, {
      encoding: 'uft-8',
    })
    const parseTemplate =  handlebars.compile(templateFileContect);

    return parseTemplate(variables);
  }
}

export default HandleBarsMailTemplateProvider;
