import { FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { CardEditor } from './components/CardEditor'
import { ChangedRecord } from './components/CardField'
import { CardViewer, CardViewerProps } from './components/CardViewer'
import { Header } from './components/Header'
import html2canvas from 'html2canvas'

type CardObject = CardViewerProps

const App: FunctionComponent = () => {
  const [card, setCard] = useState<CardObject & ChangedRecord>({})
  const [submittedCard, setSubmittedCard] = useState<HTMLCanvasElement | null>(null)

  const changeHandler = (changed: ChangedRecord): void => {
    setCard({ ...card, ...changed })
  }

  const submitHanlder = async (): Promise<void> => {
    const $cardViewer = document.getElementById('cardViewer')
    if ($cardViewer == null) return
    const canvas = await html2canvas($cardViewer, {
      backgroundColor: null,
      removeContainer: false,
      width: 334,
      height: 478
    })
    setSubmittedCard(canvas)
  }

  const shareHandler = (): void => {
    if (submittedCard == null) return
    window.open(submittedCard?.toDataURL(), 'new')
  }

  useEffect(() => {
    if (submittedCard == null) return

    const confettiId = 'confetti'

    const confetti = new Confetti(confettiId)

    confetti.setCount(300)
    confetti.setSize(1)
    confetti.setPower(40)
    confetti.setFade(false)
    confetti.destroyTarget(true)

    setTimeout(() => {
      document.getElementById(confettiId)?.click()
    }, 0)
  }, [submittedCard])

  return (
    <div id='mainContainer' className='flex flex-col w-screen h-screen bg-black bg-opacity-50 overflow-scroll'>
      <Header title='Terraforming Cards' />
      <div className='flex flex-col-reverse md:flex-row sm:mb-2 flex-grow text-white'>
        <CardViewer {...card} />
        <div className='h-full flex flex-grow items-center justify-center md:justify-start m-2'>
          <CardEditor onChange={changeHandler} />
        </div>
      </div>
      <div className='h-24 pb-2'>
        <Button id='submit' onClick={submitHanlder as () => void}>
          Continuar
        </Button>
      </div>
      {(submittedCard != null) && (
        <div className='fixed w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm'>
          <div className='text-white flex justify-center items-center rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 cursor-pointer text-3xl w-14 h-14 mb-2' onClick={() => { setSubmittedCard(null) }}>
            <span className='-mt-1'>x</span>
          </div>
          <img className='w-[334px] h-[478px]' src={`${submittedCard?.toDataURL()}`} alt='submitted card' />
          <Button id='share' onClick={shareHandler} color='secondary'>
            Compartir
          </Button>
        </div>
      )}
      <div id='confetti' className='left-0 bottom-0' />
    </div>
  )
}

export default App
