import React from 'react'
import HealthCheckMolecules from '../molecules/HealthCheckMolecules'
import HealthCheckResultMolecules from '../molecules/HealthCheckResultMolecules'

/**
 * Props
 */
interface HealthCheckOrganismsProps {
  onClickHealthCheckButton: () => void
  result: HealthCheckResponse
}

/**
 * HealthCheckOrganisms
 */
const HealthCheckOrganisms: React.FC<HealthCheckOrganismsProps> = ({
  onClickHealthCheckButton,
  result,
}) => (
  <div>
    <HealthCheckMolecules onClickHealthCheckButton={onClickHealthCheckButton} />
    <HealthCheckResultMolecules result={result} />
  </div>
)

export default HealthCheckOrganisms
