import { useEffect } from 'react';
import './App.css'
import { useTelegram } from './hooks/useTelegram';


function App() {
  const {onToggleButton,tg} = useTelegram();

  useEffect(()=>{
    tg.ready();
  },[])

  return (
    <div>
      <button onClick={onToggleButton}>toggle</button>
      
    </div>
  );
}

export default App;
