interface ITemplateVariable{
  [key: string]: string | number;
}
export default interface IPaseMailTemplateDTO{
  file: string;
  variables: ITemplateVariable;
}
