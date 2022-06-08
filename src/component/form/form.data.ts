interface IFormData {
  title: string
  subTitle: string
  questionList: string[]
}

export const formData: IFormData = {
  title: 'Question Data',
  questionList: [
    'What are you good at?',
    'What do you enjoy most about your current job?',
    'What are you most proud of?',
  ],
  subTitle: 'Summary'
}
