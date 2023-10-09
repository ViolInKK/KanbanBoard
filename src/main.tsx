import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import KanbanBoard from './views/kanbanBoard.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
// import Landing from './views/Landing.tsx'

const router = createHashRouter([
  {
    path: "/*",
    element: <KanbanBoard/>,
  },
  // {
  //   path: "/kanbanboard",
  //   element: <KanbanBoard/>
  // }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
