import { DisqusJS } from 'disqusjs/react';
import 'disqusjs/react/styles/disqusjs.css';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function Comment() {
  const pathname = useRouter().asPath;
  let [theme,setTheme] = useState('');
  console.log(pathname)
  useEffect(()=>{
       let getTheme = localStorage.getItem('theme');
       setTheme(getTheme)
  },[])
  return (
   <>
     { theme === 'dark'?  <section class="nes-container is-dark">
        <section class="message-list">
          <section class="message -left">
          

            <div class="nes-balloon from-left is-dark">
              <p>Hello 网友</p>
            </div>
          </section>

          <section class="message -right">

            <div class="nes-balloon from-right is-dark">
              <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
            </div>
           
          </section>
          
          <i class="nes-mario "></i>
        </section>
      </section>: <section class="nes-container">
        <section class="message-list">
          <section class="message -left">
            <i class="nes-bcrikko is-small"></i>

            <div class="nes-balloon from-left">
              <p>Hello NES.css</p>
            </div>
          </section>

          <section class="message -right">

            <div class="nes-balloon from-right">
              <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
            </div>
            <i class="nes-bcrikko is-small"></i>
          </section>
        </section>
      </section>}  
      <section className='text-center mt-6 mb-8'>
      <label  for="textarea_field"></label>
      <textarea  style={{'caretColor':'red'}}  id="textarea_field" class="nes-textarea"></textarea>  
      <button type="button" class="nes-btn mt-6 is-primary">添加留言</button>
      </section>
      
      </>
  )
}