//layout页面ts类型

// 菜单
export interface IMenu {
  path: string
  name: string
  component?: any
  meta?: {
    title?: string
    icon?: string
  }
}

// 磁盘列表
export interface IDisk {
  name: string
  path: string
}

// 电影表格
export interface IMovie {
  name: string
  preview: string
}
