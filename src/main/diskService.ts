import { exec } from 'child_process'
import util from 'util'
import fs from 'fs'
import path from 'path'
//获取磁盘
export const getDisk = async () => {
  // 把exec转成promise
  const execPromise = util.promisify(exec)
  const { stdout } = await execPromise('wmic logicaldisk get name')
  return stdout.trim().split('\n').slice(1)
}

//获取磁盘下的文件
const readdirPromise = util.promisify(fs.readdir)
export const getDiskFile = async (_event: Event, data: string) => {
  // 读取目录
  return await readdirPromise(data)
}

// 替换文件名字
const renamePromise = util.promisify(fs.rename)
export const replaceFileName = async (event: Event, data: any) => {
  const fileList = await getDiskFile(event, data.path)

  // 使用 map 和 Promise.all 来确保所有文件重命名操作都完成
  const renamePromises = fileList.map(async (item) => {
    const newName = item.replace(data.findContent, data.replaceContent)
    const newNamePath = data.path + newName
    const oldNamePath = data.path + item

    await renamePromise(oldNamePath, newNamePath)
    return newName
  })

  const renamedFiles = await Promise.all(renamePromises)

  return {
    data: renamedFiles.filter(Boolean),
    msg: '替换成功'
  }
}

//插入文件名字
export const insertFileName = async (event: Event, data: any) => {
  const fileList = await getDiskFile(event, data.path)

  // 使用 map 和 Promise.all 来确保所有文件重命名操作都完成
  const renamePromises = fileList.map(async (item) => {
    const newName = data.rule === '0' ? data.insertContent + item : item + data.insertContent
    const newNamePath = data.path + newName
    const oldNamePath = data.path + item

    await renamePromise(oldNamePath, newNamePath)
    return newName
  })

  const renamedFiles = await Promise.all(renamePromises)
  return {
    data: renamedFiles.filter(Boolean),
    msg: '替换成功'
  }
}

//按照序号重构文件名字
export const reorderFileNameByIndex = async (event: Event, data: any) => {
  const fileList = await getDiskFile(event, data.path)
  // 使用 map 和 Promise.all 来确保所有文件重命名操作都完成
  const renamePromises = fileList.map(async (item, index) => {
    const suffixName = path.extname(item)
    const newName = `${data.name} S${data.season.toString().padStart(2, '0')}E${(index + 1).toString().padStart(2, '0')}${suffixName}`
    const newNamePath = data.path + newName
    const oldNamePath = data.path + item

    await renamePromise(oldNamePath, newNamePath)
    return newName
  })

  const renamedFiles = await Promise.all(renamePromises)

  return {
    data: renamedFiles.filter(Boolean),
    msg: '替换成功'
  }
}
