import { createLogger, format, transports } from 'winston'
import type {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports/index.js'
import util from 'util'
import config from '../config/config.js'
import { EApplicationEnvironment } from '../constants/application.js'
import * as sourceMapSupport from 'source-map-support'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//
//LINKING TRACE SUPPORT
//
sourceMapSupport.install()

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info
  const customLevel = level.toUpperCase()

  const customTimeStamp = timestamp
  const customMessage = message
  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null,
  })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${'META '}${customMeta}\n`
  return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ]
  }
  return []
}

const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta } = info

  const logMeta: Record<string, unknown> = {}
  for (const [key, value] of Object.entries((meta ?? {}) as Record<string, unknown>)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || '',
      }
    } else {
      logMeta[key] = value
    }
  }
  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta,
  }
  return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.File({
        filename: path.join(__dirname, '../../logs/', `${config.ENV}.log`),
        level: 'info',
        format: format.combine(format.timestamp(), fileLogFormat),
      }),
    ]
  }
  return []
}

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...fileTransport(), ...consoleTransport()],
})
