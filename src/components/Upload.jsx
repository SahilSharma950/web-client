
const Upload = () => {

  return (
    <form action="http://localhost:3000/upload" 
          method="POST" encType="multipart/form-data">
        <input type="file" name="file" required/>
        <button type="submit">Upload File</button>
    </form>
  )
}

export default Upload