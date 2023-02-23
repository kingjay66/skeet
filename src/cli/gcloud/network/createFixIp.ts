import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getNetworkConfig'
import { execSync } from 'child_process'

export const createFixIp = async (
  projectId: string,
  region: string,
  ipName: string
) => {
  const shCmd = [
    'gcloud',
    'compute',
    'addresses',
    'create',
    ipName,
    '--region',
    region,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}

export const getIp = async (projectId: string, ipName: string) => {
  try {
    const shCmd = [
      'gcloud',
      'compute',
      'addresses',
      'describe',
      ipName,
      '--format="get(address)"',
      '--global',
      '--project',
      projectId,
    ]
    const ip = String(execSync(shCmd.join(' '))).replace(/\r?\n/g, '')
    console.log(ip)
    return ip
  } catch (error) {
    throw new Error(`getIp: ${JSON.stringify(String(error))}`)
  }
}
