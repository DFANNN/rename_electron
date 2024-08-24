<template>
  <div>
    <div class="header-box">
      <div></div>
      <h1 class="title">插入文本</h1>
      <el-button type="primary" class="file-btn" :icon="FolderAdd" @click="selectFileHandle"
        >选择文件夹
      </el-button>
    </div>
    <el-form
      label-position="right"
      ref="formDataRef"
      label-width="auto"
      :model="formData"
      style="max-width: 70%"
    >
      <el-form-item label="修改文件地址：" prop="path">
        <el-input v-model="commonStore.path" placeholder="请选择修改文件地址" disabled />
      </el-form-item>
      <el-form-item label="插入规则：" prop="rule">
        <el-select v-model="formData.rule" placeholder="请选择插入规则">
          <el-option label="插入到开头" value="0" />
          <el-option label="插入到结尾" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="插入文本：" prop="insertContent">
        <el-input v-model="formData.insertContent" placeholder="请输入插入文本" />
      </el-form-item>
      <el-form-item label="操作：">
        <el-button type="primary" class="btn" @click="reset">重置</el-button>
        <el-button type="primary" class="btn" @click="previewRename">预览</el-button>
        <el-button type="primary" class="btn" @click="confirm">执行</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" :stripe="true" border height="400">
      <el-table-column type="index" :index="indexMethod" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="preview" label="预览结果" />
    </el-table>

    <SelectFile ref="selectFileRef" @getFileMovie="getFileMovie" />
  </div>
</template>

<script setup lang="ts">
import { FolderAdd } from '@element-plus/icons-vue'
import SelectFile from '@renderer/components/selectFile.vue'
import { useCommonStore } from '@renderer/store/common'
import type { IMovie } from '@renderer/types/layout'
import { ElMessage, type FormInstance } from 'element-plus'

// store
const commonStore = useCommonStore()
// ref
const selectFileRef = ref<InstanceType<typeof SelectFile> | null>()
const formDataRef = ref<FormInstance>()
//表单
const formData = ref({
  path: '',
  rule: '',
  insertContent: ''
})

// 表格
const tableData = ref<IMovie[]>([])

// 序号函数
const indexMethod = (index: number) => {
  return index + 1
}

// 重置
const reset = async () => {
  formDataRef.value?.resetFields()
  commonStore.setPath('')
  tableData.value = []
}

// 选择文本
const selectFileHandle = async () => {
  selectFileRef.value?.openDialog()
}

// 获取文件下的电影
const getFileMovie = async () => {
  const data = await window.electron.ipcRenderer.invoke('get-disk-file', commonStore.path)
  tableData.value = data.map((item: string) => {
    return {
      name: item,
      preview: ''
    }
  })
}

// 预览
const previewRename = () => {
  tableData.value.forEach((item: IMovie) => {
    // item.preview = item.name.replace(formData.value.findContent, formData.value.insertContent)
    if (formData.value.rule === '0') {
      item.preview = formData.value.insertContent + item.name
    } else {
      item.preview = item.name + formData.value.insertContent
    }
  })
}

// 执行
const confirm = async () => {
  const params = {
    ...formData.value,
    path: commonStore.path
  }
  const { msg, data } = await window.electron.ipcRenderer.invoke('insert-file-name', params)
  ElMessage.success(msg)
  tableData.value = data.map((item: string) => {
    return {
      name: item,
      preview: ''
    }
  })
}

onMounted(() => {
  if (commonStore.path) {
    getFileMovie()
  }
})
</script>

<style scoped lang="less">
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  width: 30%;
  margin-right: 5%;

  &:last-child {
    margin-right: 0;
  }
}

.el-button {
  margin-left: 0;
}
</style>
