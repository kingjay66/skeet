import * as Skeet from '@/cli'
import { SkeetCloudConfig, importConfig } from '@/index'
import { getNetworkConfig } from '@/lib/getNetworkConfig'
import { Logger } from '@/lib/logger'

export const setupLoadBalancer = async (domain: string) => {
  try {
    const skeetCloudConfig: SkeetCloudConfig = await importConfig()
    const networkConf = await getNetworkConfig(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName
    )
    await Skeet.createFixIp(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.region,
      networkConf.loadBalancerIpName
    )
    await Skeet.createNeg(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName,
      skeetCloudConfig.api.region
    )
    await Skeet.createBackend(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName
    )
    await Skeet.addBackend(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName,
      skeetCloudConfig.api.region
    )
    await Skeet.createLb(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName
    )
    await Skeet.createSsl(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName,
      domain
    )
    await Skeet.createProxy(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName
    )
    await Skeet.createFr(
      skeetCloudConfig.api.projectId,
      skeetCloudConfig.api.appName
    )
    await Logger.success(`Successfully created Load Balancer!`)
  } catch (error) {
    await Logger.error(`setupLoadBalancer error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}