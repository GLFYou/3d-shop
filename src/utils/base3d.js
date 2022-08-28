import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class Base3d {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.camera = null
    this.scene = null
    this.renderer = null
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
    this.initRenderer() // 初始化渲染器
    this.initControls() // 初始化控制器
    this.addMesh() // 添加控制器
    // this.addAxesHelper()
  }

  initScene() {
    this.scene = new THREE.Scene()
    this.setEnvMap('000')
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000)
    this.camera.position.set(-1.8, 1, 2.7)
    // this.camera.setFocalLength(100)
  }

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
    new RGBELoader().setPath('./files/hdr/').load(`${hdr}.hdr`, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
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
  }

  // 加载模型
  setModel(name) {
    return new Promise((resolve, reject) => {
      // const loader = new GLTFLoader().setPath('files/gltf/')
      const loader = new GLTFLoader().setPath('my-api/models/shop3d/')
      loader.load(name, (gltf) => {
        this.model = gltf.scene.children[0]
        // 让模型中心位于场景中心
        // const box3 = new THREE.Box3()
        // box3.expandByObject(this.model)
        // const center = new THREE.Vector3()
        // box3.getCenter(center)
        // this.model.position.x = this.model.position.x - center.x
        // this.model.position.y = this.model.position.y - center.y
        // this.model.position.z = this.model.position.z - center.z

        // this.model.scale.set(0.1, 0.1, 0.1)// 乔丹1
        // this.model.scale.set(0.1, 0.1, 0.1)// 浮空车
        // this.model.scale.set(0.5, 0.5, 0.5) // 可爱电脑
        // this.model.scale.set(1, 1, 1) // gucci
        // this.model.scale.set(1, 1, 1) // 高跟
        // this.model.scale.set(0.2, 0.2, 0.2 ) // new balance
        // this.model.scale.set(0.2, 0.2, 0.2) // 手办
        // this.model.scale.set(0.01, 0.01, 0.01) // 赛博电脑
        // 模型加载进场景中时，会把gltf.scene.children的子项移动到this.scene.children中
        this.scene.add(this.model)
        resolve('模型加载成功!')
        // if ((name === 'bag2.glb') & !this.panzi) {
        //   this.panzi = gltf.scene.children[5]
        //   // this.scene.add(this.panzi)
        //   this.scene.add(gltf.scene)
        //   // 修改摄像头为模型摄像头
        //   this.camera = gltf.cameras[0]
        //   // 调动动画
        //   this.mixer = new THREE.AnimationMixer(this.camera)
        //   this.AnimationMixer = this.mixer.clipAction(gltf.animations[0])
        //   // 设置播放动画时长、次数
        //   this.animateAction.setDuration(20).setLoop(THREE.LoopOnce)
        //   // 播放完后停止
        //   this.animateAction.clampWhenFinished = true
        // }
      })
    })
  }

  addMesh() {
    this.setModel('GUCCI-bag.glb')
  }

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
