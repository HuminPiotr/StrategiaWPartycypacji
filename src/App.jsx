import ProgressBar from './components/ProgressBar.jsx'

import Hero from './sections/Hero.jsx'
import WhyStrategies from './sections/WhyStrategies.jsx'
import LawChange from './sections/LawChange.jsx'
import WhereProblem from './sections/WhereProblem.jsx'
import TwoModels from './sections/TwoModels.jsx'
import WhenInvolve from './sections/WhenInvolve.jsx'
import Tools from './sections/Tools.jsx'
import Facade from './sections/Facade.jsx'
import GoldenRatio from './sections/GoldenRatio.jsx'
import ReturnToQuestion from './sections/ReturnToQuestion.jsx'

export default function App() {
  return (
    <>
      <ProgressBar />
      <a className="skip-link" href="#why">
        Przejdź do treści
      </a>
      <main>
        <Hero />
        <WhyStrategies />
        <LawChange />
        <WhereProblem />
        <TwoModels />
        <WhenInvolve />
        <Tools />
        <Facade />
        <GoldenRatio />
        <ReturnToQuestion />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            Synteza napięć i wniosków z debaty praktyków. Materiał anonimowy — głosy oznaczone
            rolami, nie osobami.
          </p>
        </div>
      </footer>
    </>
  )
}
