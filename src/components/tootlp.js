import { useSelector } from "react-redux"

export default function Tootip({children}){
    let themes = useSelector(state=>state.theme.themes)
    return  <p style={{'position':'fixed','left':'0','bottom':'0'}} className={themes == 'dark'?'is-dark nes-balloon from-left ':'nes-balloon from-left'}>
    {children}
  </p>
}
