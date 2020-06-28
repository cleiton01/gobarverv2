interface IMailConfig {
  driver: 'ses' | 'ethereal',
  defaults: {
    from: {
      name: string;
      email: string;
    }
  }

}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Equipe Van Piercer',
      email: 'equipe@vanpiercer.com.br',
    }
  }
} as IMailConfig;
