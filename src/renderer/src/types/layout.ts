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
