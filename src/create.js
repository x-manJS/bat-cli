import ora from 'ora'
import inquirer from 'inquirer'
import downLoadGit from 'download-git-repo'

let create = async () => {
    let loading = ora('模板拉取中...')
    let answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message:'项目名称',
        default:'component-demo'
      },
      {
        type: 'list',
        name: 'projectType',
        message: '项目模板',
        choices: ['组件模板', '单页面模板'],
        default: '组件模板'
      }
    ])

    let project = answer.projectName
    let templateName = answer.projectType === '组件模板' ? 'x-manJS/bat-component-template' : 'x-manJS/bat-page-template'
    loading.start()

    downLoadGit(templateName, process.cwd() + '/' + project, (err) => {  
      if (err) {
        console.log(err)
        return
      }
      console.log(process.cwd()+'/'+project)
      loading.succeed()
      console.log('')
      console.log('模板拉取成功！')
      console.log('')
      console.log('请使用以下命令启动项目：')
      console.group('')
      console.log(`cd ${project}`)
      console.log('yarn')
      console.log('yarn run dev')
    })
}

export default create
