import { Metadata } from '@redwoodjs/web'
import ArticleCell from 'src/components/ArticleCell'

const ArticlePage = ({id}) => {
  return (
    <>
      <Metadata title={`Article ${id}`} description="Article page" />
      <ArticleCell id={id} rand={Math.random()}/>
    </>
  )
}

export default ArticlePage
