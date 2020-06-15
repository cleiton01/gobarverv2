import nodemailer, {Transporter} from 'nodemailer';
import {inject, injectable} from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

interface IMessages{
  to: string;
  body: string;
}

class SNSMailProvider implements IMailProvider {
  private messages:IMessages[] = [];

  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });

      this.client = transporter;
    });
  }


  public async sendMail({to, subject, from, templateData}:ISendMailDTO): Promise<void>{
    const message = this.client.sendMail({
      from: {
        name: from?.name || 'Cleiton Silva',
        address: from?.email || 'clleiton.silva@gmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log(message);

  }

}
export default SNSMailProvider;
