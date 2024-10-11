import { ElMessage } from 'element-plus'
import type { ToastType } from './types'

const toastHandler = (message: string, type: ToastType) => {
  ElMessage({
    message,
    type
  })
}

export default toastHandler
