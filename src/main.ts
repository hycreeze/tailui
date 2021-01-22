import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Button from "@/components/button/index"
import './plugin/index'

const app = createApp(App)
// 挂载组件
app.component(Button.name, Button);



app.mount('#app')

