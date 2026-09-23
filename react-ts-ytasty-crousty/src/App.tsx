import './App.css'
import HelloWorld from './components/HelloWorld'
import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);
  let isValid: boolean = true;
  return (
    <>
      <section id="center">
        <div>
          {isValid && <HelloWorld name="Ytasty Crousty" />}
          {
            count > 3 ?
              <div>Important things</div>
              :
              <div>Some things</div>
          } 
          {
            ["Loïse", "Marie"].map(el => <HelloWorld name={el} />)
          }
          <button onClick={() => {setCount(count+1)}}>Click me !</button>
        </div>
      </section>
    </>
  )
}

export default App

