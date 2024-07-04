import logo from './p-for-prime.svg';
import './App.css';

import { useState } from 'react';

function checkIfPrime(n, prevPrimeArray, setPrimeArray, setPrimeState) {
  // addressing the edge cases first
  // 1. immediately exiting if n is even (every even number divisible by 2)
  // 2. However, the only even number that is an exception to this is 2 itself.
  // 3. 1 is not prime by definition, and is not caught by the following logic in the algorithm.
  if (n % 2 == 0 && n > 2 || n == 1) { 
    setPrimeState(false)
  } else { // all primes are odd, but not all odds are prime.
    for (var i = 0; i < prevPrimeArray.length; i++) {
      const p = prevPrimeArray[i]
      if (p > Math.sqrt(n)) {
        break // no need to compute past sqrt(n)
        // https://en.wikipedia.org/wiki/Primality_test#Simple_methods
      }

      // every composite number is a product of primes (fundemental theorem of algebra)
      // and so every divisor can be reduced down to a prime divisor
      // and so we only need to check if there are any prime divisors for n
      if (n % p == 0) {
        setPrimeState(false)
        return
      }
    }

    // reaching here means that no previous primes were divisors of n, 
    // and so n must be prime.
    // Append it to our prevPrimeArray and return true
    prevPrimeArray.push(n)
    setPrimeArray(prevPrimeArray)
    setPrimeState(true)
  }
}

function IsPrimeText({ isPrime }) {
  if (isPrime) {
    return (
      <span style={{color: "#008000"}}> prime </span>
    )
  } else {
    return (
      <span style={{color: "#FF0000"}}> not prime </span>
    )
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [prevPrimeArray, setPrimeArray] = useState([])
  const [isPrime, setPrimeState] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <p style={{padding: "10px"}}> A counter, but it tells you if the number is prime</p>
        <span style={{color: "#BEBEBE"}}> <em> See how I made this <a style={{color: "#00FFFF"}} href="https://ismaelkhan.com"> here </a> </em> </span>
        <img src={logo} className="App-logo" alt="logo"/>

        <p>
          {count} is <IsPrimeText isPrime={isPrime}/>
        </p>

        <button style={{
          height: "30px",
          fontSize: "20px"
        }} onClick={()=>{
          setCount(count + 1); 
          checkIfPrime(count + 1, prevPrimeArray, setPrimeArray, setPrimeState)}}>
          Increment by 1
        </button>
       
        <p>
          The last prime was... {prevPrimeArray.length == 0 ? " " : prevPrimeArray[prevPrimeArray.length - 1]}
        </p>
        
      </header>
    </div>
  );
}

export default App;
