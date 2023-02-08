import { execSyncCmd } from '@/lib/execSyncCmd'
import { API_PATH } from '@/lib/getNetworkConfig'

export const apiYarn = async () => {
  const shCmd = ['yarn', '--cwd', API_PATH, 'install']
  execSyncCmd(shCmd)
}
