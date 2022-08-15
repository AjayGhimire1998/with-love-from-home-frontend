import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from '../../../authentication/form-helpers/Dropdown'

function Filter() {
  const {categoryItems} = useSelector((store) => store.store)
  return (
    <Dropdown categoryItems={categoryItems}/>
  )
}

export default Filter