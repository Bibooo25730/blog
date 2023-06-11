import 'disqusjs/react/styles/disqusjs.css';
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback, useRef } from 'react';
import { isUrl, isemail } from '../lib/rex';
import { useSelector, useDispatch } from 'react-redux';

import { CommitQuery } from "../service/theme"
import Tootip from './tootlp';
export default function Comment() {
  const pathname = useRouter().asPath;
  let textRef = useRef();
  // list
  let [comList, setComlist] = useState([]);
  let [boel, setboel] = useState(false);
  let [tooptitle, setTooptitle] = useState('');
  let [timeUrl, settimeUrl] = useState(null);
  let [timemail, settimemail] = useState(null);

  console.log(pathname)
  // 留言对象
  let [commObj, setComobj] = useState({
    name: '',
    email: '',
    url: '',
    content: '',
    path: pathname
  });
  const dispath = useDispatch();
  let themes = useSelector(state => state.theme.themes)


  useEffect(() => {
    (themes === 'light' ? 'dark' : 'light')
    dispath(CommitQuery(pathname)).unwrap()
      .then((noriginalPromiseResult) => {
        console.log(noriginalPromiseResult)
        setComlist(noriginalPromiseResult.data)
      })
      .catch((rejectedValueOrSerializedError) => {
        throw rejectedValueOrSerializedError
      })
  }, [tooptitle])
  async function handleComment() {
    setTooptitle('')
    let { name, email,content, url } = commObj;
    if ([name, email, content,url].some(val => val === '')) {
      console.log(13)
      return setboel(true), setTooptitle('输入值为空');
    } else {
      setboel(false);
      // 提交
      let result = await fetch('https://www.bibooo.cn/api/commt', {
        method: 'POST',
        body: JSON.stringify(commObj)
      })
      let res = await result.json()
      if (res.status == 200) {
        setTooptitle('提交成功')

      }


    }
  }
  function handleChangeNmae(e) {
    console.log(e)
    let { target } = e;
    let { value } = target;
    console.log(value)
    setComobj({
      ...commObj,
      name: value
    })
  }
  function handleChangeEmail(e) {
    console.log(e)
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
  function handelContent(e) {
    console.log(e)
    let { target } = e;
    let { value } = target;
    setComobj({
      ...commObj,
      content: value
    })
  }

  return (
    <>
      {boel ? <Tootip>{tooptitle}</Tootip> : ''}

      {themes === 'dark' ? <section className="nes-container is-dark">

        <section className="message-list">
          <section className="message -left">
            <div className="nes-balloon from-left is-dark">
              <p>Hello 网友</p>
            </div>
          </section>
          {comList.map((item,index) => (

            <section key={index} className="message -right  flex justify-end">
              <div className="nes-balloon from-right is-dark  ">
                <p>{item.content}</p>
              </div>
            </section>
          ))}

          <i className="nes-mario "></i>

        </section>
      </section> : <section className="nes-container is-light">
        <section className="message-list">
          <section className="message -left">

            <div className="nes-balloon from-left">
              <p >Hello 网友</p>
            </div>
          </section>


          <section className="message -right">
</section>


          <i className="nes-mario "></i>
        </section>
      </section>}
      <section className='text-center mt-6 mb-8'>
        <label htmlFor="textarea_field"></label>
        <textarea ref={textRef} onChange={handelContent} style={{ 'caretColor': 'red' }} placeholder="在这里输入你的评论" id="textarea_field" className="nes-textarea"></textarea>
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
