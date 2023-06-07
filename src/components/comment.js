import { DisqusJS } from 'disqusjs/react';
import 'disqusjs/react/styles/disqusjs.css';
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react';
import { isUrl, isemail } from '../lib/rex';
import { useSelector } from 'react-redux';
export default function Comment() {
  const pathname = useRouter().asPath;
  let [timeUrl, settimeUrl] = useState(null);
  let [timemail, settimemail] = useState(null);
  // 留言对象
  let [commObj, setComobj] = useState({
    name: '',
    email: '',
    url: ''
  });
  let themes = useSelector(state=>state.theme.themes)
  console.log('store',themes)
  useEffect(() => {
    (themes === 'light' ? 'dark' : 'light')
  }, [])
  function handleComment() {
    let { name, email, url } = commObj;
    if ([name, email, url].some(val => val === '')) {
      return null;
    } else {
      // 提交
    }
  }

  function handleChangeNmae(e) {
    let { target } = e;
    let { value } = target;
    console.log(value)
    setComobj({
      ...commObj,
      name: value
    })
  }
  function handleChangeEmail(e) {
    let { target } = e;
    let { value } = target;

    target.classList = isemail(value) ? ['nes-input is-success'] : ['nes-input is-error'];
    if (isemail(value)) {
      setComobj({
        ...commObj,
        email: value
      })
    }
  }

  function handleChangeUrl(e) {
    let { target } = e;
    let { value } = target;
    console.log(value)
    target.classList = isUrl(value) ? ['nes-input is-success'] : ['nes-input is-error']
    if (isUrl(value)) {
      setComobj({
        ...commObj,
        url: value
      })
    }
  }
  return (
    <>
      {themes === 'dark' ? <section className="nes-container is-dark">
        <section className="message-list">
          <section className="message -left">
            <div className="nes-balloon from-left is-dark">
              <p>Hello 网友</p>
            </div>
          </section>

          <section className="message -right">

            <div className="nes-balloon from-right is-dark">
              <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
            </div>
          </section>
          <i className="nes-mario "></i>

        </section>
      </section> : <section className="nes-container">
        <section className="message-list">
          <section className="message -left">

            <div className="nes-balloon from-left">
              <p>Hello 网友</p>
            </div>
          </section>

          <section className="message -right">

            <div className="nes-balloon from-right">
              <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
            </div>
          </section>
          <i className="nes-mario "></i>
        </section>
      </section>}
      <section className='text-center mt-6 mb-8'>
        <label htmlFor="textarea_field"></label>
        <textarea style={{ 'caretColor': 'red' }} placeholder="在这里输入你的评论" id="textarea_field" className="nes-textarea"></textarea>
        <section className='flex flex-row'>
          <div className="nes-field basis-1/4">
            <label htmlFor="name_field">名字</label>
            <input maxLength="6" onChange={handleChangeNmae} type="text" id="name_field" className="nes-input"></input>
          </div>
          <div className="nes-field basis-2/4">
            <label htmlFor="name_field">邮箱</label>
            <input onChange={handleChangeEmail} type="email" id="name_field" className="nes-input"></input>
          </div>
          <div className="nes-field basis-1/2 ">
            <label htmlFor="name_field">网页</label>
            <input onChange={handleChangeUrl} type="url" id="name_field" className="nes-input" ></input>
          </div>
        </section>
        <button type="button" onClick={handleComment} className="nes-btn mt-6 is-primary">添加留言</button>

      </section>

    </>
  )
}
