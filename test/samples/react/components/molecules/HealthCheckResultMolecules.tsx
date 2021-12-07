import React from 'react'
import moment from 'moment'

/**
 * Props
 */
interface HealthCheckResultMoleculesProps {
  result: HealthCheckResponse
}

/**
 * HealthCheckMolecules
 */
const HealthCheckResultMolecules: React.FC<HealthCheckResultMoleculesProps> = ({
  result,
}) => {
  const getResultText = () => {
    if (result?.checkTime == null) return '未実行'
    return result?.success ? '成功' : '失敗'
  }

  return (
    <div>
      <div>{getResultText()}</div>
      <div>
        {result?.checkTime != null
          ? moment(result.checkTime).format('YYYY-MM-DD HH:mm:ss')
          : ''}
      </div>
    </div>
  )
}

export default HealthCheckResultMolecules
