<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="选择文件夹"
      width="70%"
      align-center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="fileForm" label-position="top">
        <el-form-item label="文件夹地址：">
          <el-select v-model="fileForm.path" placeholder="请选择文件夹地址">
            <el-option v-for="item in diskOptions" :key="item" :label="item" :value="item" />
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

          <div class="disk-name">{{ item }}</div>

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
// dialog开关
const dialogVisible = ref(false)

// 磁盘列表
const diskOptions = ref<string[]>([])
const diskList = ref<string[]>([])

// form
const fileForm = ref({
  path: ''
})

// 获取本地磁盘
const getDisk = async () => {
  const data: string[] = await (window.api as { getDisk: () => Promise<string[]> }).getDisk()
  diskOptions.value = data
  diskList.value = data
}

// 选择磁盘
const getDiskFile = (item) => {
  console.log(item)
}

// 确定
const confirm = () => {}

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
