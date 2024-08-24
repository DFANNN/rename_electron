<template>
  <div>
    <div class="header-box">
      <div></div>
      <h1 class="title">索引文本</h1>
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
      <el-form-item label="剧集名：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入剧集名" />
      </el-form-item>
      <div class="season-episode-box">
        <el-form-item label="剧集季：" class="season-box" prop="season">
          <el-input-number
            class="input-number"
            v-model="formData.season"
            :min="1"
            :max="100"
            placeholder="请输入剧集季"
          />
        </el-form-item>
        <el-form-item label="起始集：" class="episode-box" prop="episode">
          <el-input-number
            class="input-number"
            v-model="formData.episode"
            :min="1"
            :max="100"
            placeholder="请输入剧集起始集"
          />
        </el-form-item>
      </div>

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
  name: '',
  season: 1,
  episode: 1
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
  let episode = formData.value.episode
  tableData.value.forEach((item: IMovie, _index: number) => {
    const fileType = item.name.split('.').pop()
    item.preview = `${formData.value.name} S${formData.value.season.toString().padStart(2, '0')}E${episode.toString().padStart(2, '0')}.${fileType}`
    episode++
  })
}

// 执行
const confirm = async () => {
  const params = {
    ...formData.value,
    path: commonStore.path
  }
  const { msg, data } = await window.electron.ipcRenderer.invoke('reorder-file-name', params)
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

.input-number {
  width: 100%;
}

.season-episode-box {
  display: flex;

  .season-box {
    flex: 1;
  }

  .episode-box {
    flex: 1;
  }
}
</style>
