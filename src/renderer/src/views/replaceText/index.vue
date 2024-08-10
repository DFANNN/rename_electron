<template>
  <div>
    <div class="header-box">
      <div></div>
      <h1 class="title">文本替换</h1>
      <el-button type="primary" class="file-btn" :icon="FolderAdd" @click="selectFileHandle"
        >选择文件夹
      </el-button>
    </div>
    <el-form label-position="right" label-width="auto" :model="formData" style="max-width: 70%">
      <el-form-item label="修改文件地址：">
        <el-input v-model="formData.path" placeholder="请选择修改文件地址" />
      </el-form-item>
      <el-form-item label="查找文本：">
        <el-input v-model="formData.findContent" placeholder="请输入查找文本" />
      </el-form-item>
      <el-form-item label="替换文本：">
        <el-input v-model="formData.replaceContent" placeholder="请输入替换文本" />
      </el-form-item>
      <el-form-item label="操作：">
        <el-button type="primary" class="btn" @click="reset">重置</el-button>
        <el-button type="primary" class="btn">预览</el-button>
        <el-button type="primary" class="btn">执行</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" :stripe="true" border height="400">
      <el-table-column type="index" :index="indexMethod" label="序号" width="60" align="center" />
      <el-table-column prop="date" label="文件名" />
      <el-table-column prop="name" label="预览结果" />
    </el-table>

    <SelectFile ref="selectFileRef" />
  </div>
</template>

<script setup lang="ts">
import { FolderAdd } from '@element-plus/icons-vue'
import SelectFile from '@renderer/components/selectFile.vue'

const selectFileRef = ref<InstanceType<typeof SelectFile> | null>()
//表单
const formData = ref({
  path: '',
  findContent: '',
  replaceContent: ''
})

// 表格
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

// 序号函数
const indexMethod = (index: number) => {
  return index + 1
}

// 获取本地磁盘
const getDisk = async () => {
  const data = await (window.api as { getDisk: () => Promise<string[]> }).getDisk()
  console.log(data)
}

// 重置
const reset = async () => {}

// 选择文本
const selectFileHandle = async () => {
  selectFileRef.value?.openDialog()
}
onMounted(() => {
  getDisk()
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
