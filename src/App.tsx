import { FunctionComponent, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { CardEditor } from './components/CardEditor'
import { ChangedRecord } from './components/CardField'
import { CardViewer, CardViewerProps } from './components/CardViewer'
import { Header } from './components/Header'

type CardObject = CardViewerProps

const App: FunctionComponent = () => {
  const [card, setCard] = useState<CardObject & ChangedRecord>({})

  const changeHandler = (changed: ChangedRecord): void => {
    setCard({ ...card, ...changed })
  }

  return (
    <div className='flex flex-col w-screen h-screen bg-black bg-opacity-50 overflow-scroll'>
      <Header title='Terraforming Cards' />
      <div className='flex flex-col-reverse md:flex-row sm:mb-2 flex-grow text-white'>
        <CardViewer {...card} />
        <div className='h-full flex flex-grow items-center justify-center md:justify-start m-2'>
          <CardEditor onChange={changeHandler} />
        </div>
      </div>
      <div className='h-24 pb-2'>
        <Button>
          Submit Card
        </Button>
      </div>
    </div>
  )
}

export default App
