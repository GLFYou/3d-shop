import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  minimum: 0.4,
  easing: 'ease',
  speed: 1000,
  trickleSpeed: 500,
  showSpinner: false
})

export const NPStart = () => {
  NProgress.start()
}
export const NPDone = () => {
  NProgress.done()
}
