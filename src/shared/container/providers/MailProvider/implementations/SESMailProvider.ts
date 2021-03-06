// import nodemailer, {Trans} from 'nodemailer/lib/ses-transport';
import nodemailer, {Transporter} from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';

import {inject, injectable} from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

interface IMessages{
  to: string;
  body: string;
}
@injectable()
class SESMailProvider implements IMailProvider {
  private messages:IMessages[] = [];

  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new  aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1'
      }),
    })
  }


  public async sendMail({to, subject, from, templateData}:ISendMailDTO): Promise<void>{
    const {name, email} =mailConfig.defaults.from;

    const message = this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

  }

}
export default SESMailProvider;
