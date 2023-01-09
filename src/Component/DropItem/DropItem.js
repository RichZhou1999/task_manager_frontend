import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function DropItem() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here </p> :
          <p>Drop some files or click here </p>
      }
    </div>
  )
}
export default DropItem;