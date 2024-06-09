import React from 'react';
import RouterConfig from './Router/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './shadcnComponents/ui/themeProvider';
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className='max-w-[1440px] m-auto'>
   <RouterConfig/>
   <Toaster/>
   </div>
   </ThemeProvider>
  )
}

export default App