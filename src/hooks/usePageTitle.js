import { useEffect, useState } from 'react'

const usePageTitle = (title) => {
  const [pageTitle,setPageTitle] = useState(title)
  useEffect(() => {
    document.title = pageTitle
  })
  return { pageTitle, setPageTitle }
}

export default usePageTitle
