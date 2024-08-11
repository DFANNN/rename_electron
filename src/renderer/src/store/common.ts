import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  // 文件路径
  const path = ref('')

  // 修改文件路径
  const setPath = (val: string) => {
    path.value = val
  }

  return { path, setPath }
})
