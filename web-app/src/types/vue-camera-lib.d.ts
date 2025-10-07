declare module 'vue-camera-lib' {
  import { App } from 'vue'
  
  export interface PhotoData {
    blob: Blob
    image_data_url: string
  }

  export const WebCam: any
  export const WebCamUI: any
  
  const plugin: {
    install(app: App): void
  }
  
  export default plugin
}