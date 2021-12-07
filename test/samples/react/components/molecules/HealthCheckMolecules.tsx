import React from 'react'
import ButtonAtom from '../atoms/ButtonAtom'

/**
 * Props
 */
interface HealthCheckMoleculesProps {
  onClickHealthCheckButton: () => void
}

/**
 * HealthCheckMolecules
 */
const HealthCheckMolecules: React.FC<HealthCheckMoleculesProps> = ({
  onClickHealthCheckButton,
}) => (
  <div>
    <ButtonAtom value="疎通テスト" onClick={onClickHealthCheckButton} />
  </div>
)

export default HealthCheckMolecules
