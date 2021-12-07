import React from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../stores";

/**
 * Props
 */
interface ButtonAtomProps {}

/**
 * ButtonAtom
 */
const ButtonAtom: React.FC<ButtonAtomProps> = (props: ButtonAtomProps) => {
  const state = useSelector((_state: RootState) => _state)

  const healthCheckState = state.healthCheck

  return (
    <div>
      <span>{healthCheckState.result.checkTime }</span>
    </div>
  )
}

export default ButtonAtom
