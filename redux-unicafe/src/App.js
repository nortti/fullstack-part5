import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './components/reducer'

const store = createStore(counterReducer)

const FormatDecimal = average => (Math.round(average * 10) / 10) || 0

const FormatPcnt = pcnt => ((Math.round(pcnt * 1000) / 10) || 0) + " %"

const Statistiikka = ({handleReset}) => {
  const good = store.getState().good
  const ok = store.getState().ok
  const bad = store.getState().bad
  const total = good + ok + bad
  const average = FormatDecimal((good - bad) / total)
  const positivePcnt = FormatPcnt(good / total)

  if (total === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positivePcnt}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleReset}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka handleReset={this.klik('ZERO')}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)

export default App
