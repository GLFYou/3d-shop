import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

class Base3d {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.camera = null
    this.scene = null
    this.renderer = null
    // this.loadingModel = false
    // this.loadingHdr = false
    // this.controls = null
    // this.model = null
    // this.panzi = null
    this.init()
    this.animate()
    window.addEventListener('resize', this.onWindowsResize.bind(this))
  }

  init() {
    this.initScene() // 初始化场景
    this.initCamera() // 初始化相机
    this.initManager() // 初始化加载管理器
    this.initRenderer() // 初始化渲染器
    this.initControls() // 初始化控制器
    // this.initGui() // 初始化调试器
    // this.addMesh() // 初始化添加物体
    // this.setModel('GUCCI-bag.glb', 1)

    // this.addAxesHelper()
  }

  initScene() {
    this.scene = new THREE.Scene()
    // this.setEnvMap('000.hdr')
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000)
    this.camera.position.set(-1.8, 1, 2.7)
    // this.camera.setFocalLength(100)
  }

  initManager() {
    this.modelManager = new THREE.LoadingManager()
    this.hdrManager = new THREE.LoadingManager()

    // this.modelManager.onProgress = () => {
    //   this.loadingModel = true
    // }
    // this.modelManager.onLoad = () => {
    //   this.loadingModel = false
    //   console.log('modelL', this.loadingModel)
    // }

    // this.hdrManager.onProgress = () => {
    //   this.loadingHdr = true
    // }
    // this.hdrManager.onLoad = () => {
    //   this.loadingHdr = false
    //   console.log('hdrL', this.loadingHdr)
    // }
  }

  // initGui() {
  //   this.gui = new dat.GUI()
  // }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 3.5
    // this.renderer.physicallyCorrectLights = true
    this.container.appendChild(this.renderer.domElement)
  }

  setEnvMap(hdr) {
    const that = this
    if (this.loadingHdr) return
    this.loadingHdr = true
    // if (this.scene.background === null) {
    //   const timer = setInterval(() => {
    //     console.log(this.scene.background)
    //     console.log(this.loadingHdr)
    //     if (this.scene.background !== null) {
    //       // this.loadingHdr = false
    //       // clearInterval(timer)
    //     }
    //   }, 1000)
    // }
    new RGBELoader().setPath('https://www.glfy.site/images/models/shop3d/hdr/').load(hdr, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
      this.loadingHdr = false
    })
  }

  render() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    // 因为是回调函数，所以this.render的this指向不是当前的this，通过bind(this)改变指向
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.6
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 2
    this.controls.minDistance = 2
    this.controls.maxDistance = 10
  }

  // 加载模型
  setModel(name, scale) {
    if (this.loadingModel) return
    this.loadingModel = true
    // if (this.scene.children.length === 0) {
    //   const timer = setInterval(function () {
    //     if (this.scene.children.length) {
    //       this.loadingModel = false
    //       clearInterval(timer)
    //     }
    //   }, 100)
    // }
    return new Promise((resolve, reject) => {
      // const loader = new GLTFLoader().setPath('files/gltf/')
      const loader = new GLTFLoader()
      loader.setPath('https://www.glfy.site/images/models/shop3d/model/')
      loader.load(name, (gltf) => {
        if (this.scene.children.length) {
          //   this.scene.children.forEach((item) => {
          //     this.scene.remove(item)
          //   })
          this.scene.remove(this.scene.children[0])
        }
        this.model = gltf.scene.children[0]
        console.log(this.model)
        // 让模型中心位于场景中心
        // const box3 = new THREE.Box3()
        // box3.expandByObject(this.model)
        // const center = new THREE.Vector3()
        // box3.getCenter(center)
        // this.model.position.x = this.model.position.x - center.x
        // this.model.position.y = this.model.position.y - center.y
        // this.model.position.z = this.model.position.z - center.z

        this.model.scale.set(scale, scale, scale)
        // this.addGui(this.model)
        // 模型加载进场景中时，会把gltf.scene.children的子项移动到this.scene.children中
        // if (this.scene.children.length) {
        //   this.scene.remove(this.model)
        // }
        this.loadingModel = false
        this.scene.add(this.model)
        resolve('模型加载成功!')
      })
    })
  }

  // addMesh() {
  //   this.setModel('GUCCI-bag.glb')
  //   // this.setModel('http://www.glfy.site/images/models/shop3d/GUCCI-bag.glb')
  // }

  // addGui(model) {
  //   // gui.add(model.scale)
  //   const scale = { default: 1 }
  //   this.gui.add(scale, 'default', 0.001, 10, 0.001).onChange((val) => {
  //     model.scale.set(val, val, val)
  //   })
  // }

  onWindowsResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  addAxesHelper() {
    this.axesHelper = new THREE.AxesHelper(5)
    this.scene.add(this.axesHelper)
  }
}

export default Base3d
