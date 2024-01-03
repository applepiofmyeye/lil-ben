import './App.css';

function App() {

  const handleClick = (event) => {
    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 2},
          { id: 2, quantity: 1 }
        ]
      })

    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(json => Promise.reject(json))
      }
    }).then(({ url }) => {
      console.log(url);
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  }
  return (
    <>
    <h1>Order</h1>
    <button onClick={handleClick}>checkout</button>
    </>
  );
}

export default App;
