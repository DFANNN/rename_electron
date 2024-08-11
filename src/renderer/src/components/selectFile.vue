<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="选择文件夹"
      width="70%"
      align-center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
    >
      <el-form :model="fileForm" label-position="top">
        <el-form-item label="文件夹地址：">
          <el-select v-model="fileForm.path" placeholder="请选择文件夹地址">
            <el-option
              v-for="item in diskOptions"
              :key="item.path"
              :label="item.name"
              :value="item.path"
              @click="getDiskFile(item)"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="disk-box">
        <div class="disk-item" v-for="item in diskList" @click="getDiskFile(item)">
          <div class="file-icon">
            <el-icon>
              <FolderOpened />
            </el-icon>
          </div>

          <div class="disk-name">{{ item.name }}</div>

          <div>
            <el-icon>
              <ArrowRightBold />
            </el-icon>
          </div>
        </div>
      </div>
      <el-button type="primary" class="confirm-btn" @click="confirm">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FolderOpened, ArrowRightBold } from '@element-plus/icons-vue'
import type { IDisk } from '@renderer/types/layout'
import { useCommonStore } from '../store/common'

const emit = defineEmits(['getFileMovie'])
// store
const commonStore = useCommonStore()
// dialog开关
const dialogVisible = ref(false)

// 磁盘列表
const diskOptions = ref<IDisk[]>([])
const diskList = ref<IDisk[]>([])

// form
const fileForm = ref({
  path: ''
})

// 获取本地磁盘
const getDisk = async () => {
  const data = await window.electron.ipcRenderer.invoke('get-disk')
  const newData = data.map((item: string) => {
    return {
      name: item,
      path: item + '\\'
    }
  })
  diskOptions.value = newData
  diskList.value = newData
}

// 获取本地磁盘下的文件
const getDiskFile = async (params: IDisk) => {
  fileForm.value.path = params.path
  const data = await window.electron.ipcRenderer.invoke('get-disk-file', params.path)
  diskList.value = data.map((item: string) => {
    return {
      name: item,
      path: params.path + item + '\\'
    }
  })
}

// 确定
const confirm = () => {
  commonStore.setPath(fileForm.value.path)
  dialogVisible.value = false
  emit('getFileMovie')
}

// 取消
const close = () => {
  fileForm.value.path = ''
}

const openDialog = () => {
  dialogVisible.value = true
  getDisk()
}

defineExpose({
  openDialog
})
</script>

<style scoped lang="less">
.disk-box {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;

  .disk-item {
    cursor: pointer;
    height: 40px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .file-icon {
      margin-right: 20px;
      font-size: 18px;
    }

    .disk-name {
      flex: 1;
      font-size: 16px;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.confirm-btn {
  margin-top: 20px;
  width: 100%;
}
</style>
