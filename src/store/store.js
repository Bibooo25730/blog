import { configureStore } from "@reduxjs/toolkit"
import themeService from "../service/theme"

export const stroe = configureStore({
      reducer:{
          theme:themeService
      }
})
