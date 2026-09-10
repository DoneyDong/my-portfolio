import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './style.css'

const cases = [
  {
    id: 'small-products',
    no: '01',
    label: 'Small Products',
    title: '主题乐园小型周边产品系列',
    shortTitle: '小型周边\n产品系列',
    subtitle: '围绕游客纪念、活动参与与轻收藏需求，规划并落地 29-69 元价格带的小型周边产品组合。',
    market: '主题乐园 / 亲子游客 / 现场零售 / 会员活动',
    category: '积木小模型 / 钥匙扣 / 徽章 / 冰箱贴 / 挂绳证件套 / 盲盒感小模型',
    scale: '持续开发，节选项目；累计生产规模约数千个',
    channel: '现场售卖 / 会员活动 / 任务卡兑换',
    role: '产品企划 / 创意设计 / 样品开发 / 包装与 SKU 协同 / 供应链协同 / 交付管理',
    image: '/images/small-packaging.jpg',
    gallery: [
      ['/images/small-packaging.jpg'],
      ['/images/small-badges.jpg', '/images/small-lanyard.jpg'],
      ['/images/small-trophy.jpg', '/images/small-piano.jpg'],
      ['/images/small-plane.jpg'],
    ],
    highlights: ['29-69 元价格带', '数千个生产规模', '现场售卖与会员活动并行', '采购、自制、打样和外部工厂生产并用'],
    sections: [
      {
        title: 'Opportunity / 项目机会',
        text: [
          '主题乐园小型周边面对的是高频、即时、低决策成本的消费场景。游客通常在短时间内完成判断，因此产品需要快速传达主题记忆点，并适合作为纪念、礼赠或轻收藏商品被带走。',
          '该项目的关键机会，是在 29-69 元价格带内形成多品类组合，覆盖现场零售、亲子互动、任务兑换和会员活动等场景，提升主题内容的商品化效率。',
        ],
      },
      {
        title: 'Strategy / 产品策略',
        text: [
          '我将产品需求拆解为三类场景：纪念型购买、活动型参与和轻收藏型产品。钥匙扣、冰箱贴、徽章强调便携与低决策门槛；挂绳证件套与任务卡周边强调现场使用和参与感；积木小模型与盲盒感小模型强调造型记忆点、陈列价值和系列化空间。',
          '在产品企划阶段，我结合园区主题、节日活动、游客反馈和同类产品案例，判断不同主题适合单品开发、系列化开发、现场售卖还是活动兑换，从而提高产品组合与实际场景的匹配度。',
        ],
      },
      {
        title: 'Execution / 开发执行',
        text: [
          '我参与并推进了从产品选题、创意构思、样品开发、设计调整、包装与 SKU 协同、供应链沟通到最终交付的完整流程。',
          '在生产方式上，根据不同产品需求采用采购、自制、小批量打样和外部工厂生产等方式。对需要快速验证的产品，先通过小批量样品测试造型、尺寸、成本和用户反馈；对适合稳定供应的产品，再推进供应商生产和批量交付。',
        ],
      },
      {
        title: 'Impact / 项目结果',
        text: [
          '该系列累计生产规模约数千个，覆盖现场售卖、会员活动和任务卡兑换等多个场景。产品类型从积木小模型延展到钥匙扣、徽章、冰箱贴、挂绳证件套和盲盒感小模型，形成了更完整的小型周边产品组合。',
          '项目沉淀了面向潮玩及 IP 衍生品产品开发的判断方法：不仅评估产品造型与主题表达，也同步关注用户场景、价格带、生产方式、陈列价值和系列化开发潜力。',
        ],
      },
    ],
  },
  {
    id: 'seasonal-installation',
    no: '02',
    label: 'Seasonal Installation',
    title: '大型节日主题创意产品开发',
    shortTitle: '大型节日\n主题装置',
    subtitle: '将节日营销需求转化为具有互动价值、传播价值和持续迭代空间的大型主题装置。',
    market: '主题乐园 / 节日营销 / 家庭游客',
    category: '大型装置 / 主题展示 / 互动打卡产品',
    scale: '约 3m x 4m x 2.5m，1 个大型装置',
    channel: '节日活动现场 / 主题场馆展示 / 游客打卡',
    role: '产品企划 / 项目管理 / 设计审核 / 供应链协同 / 成本控制 / 现场交付',
    image: '/images/xmas3.png',
    gallery: [['/images/xmas3.png'], ['/images/xmas1.png', '/images/xmas2.png']],
    highlights: ['连续三年迭代开发', '游客拍照与停留提升', '场馆核心展示产品体系之一'],
    sections: [
      {
        title: 'Opportunity / 项目机会',
        text: [
          '节日活动是主题场馆提升游客体验和传播声量的重要节点。项目目标不是简单完成大型装饰物，而是打造具有节日氛围、视觉记忆点和拍照传播价值的核心展示装置。',
          '对于游客来说，它需要足够醒目、适合合影、能延长停留时间；对于运营和市场团队来说，它需要成为节日活动中的核心内容，并支持连续年度迭代。',
        ],
      },
      {
        title: 'Strategy / 产品策略',
        text: [
          '我从节日主题、游客动线、展示空间和互动行为出发，判断装置的视觉中心、尺寸比例、观看角度和拍照距离。',
          '在方案阶段，我同步评估结构稳定性、材料选择、灯光效果、运输方式、现场安装条件和制作周期，确保创意表现能够被真实制造和交付。',
        ],
      },
      {
        title: 'Execution / 开发执行',
        text: [
          '项目过程中，我协调设计、运营、市场、技术及供应商，统筹材料、结构、灯光、运输及现场安装等资源。',
          '面对需求变化和供应商交期风险，我重新评估成本、周期与制作影响，通过资源调整、供应商协调和工作重排保障项目交付。',
        ],
      },
      {
        title: 'Impact / 项目结果',
        text: [
          '项目连续三年完成迭代开发与交付，成为场馆节日活动中的核心展示产品之一。上线后游客拍照频次增加，现场停留时间提升，并带来更强的社交传播效果。',
        ],
      },
    ],
  },
  {
    id: 'museum-model',
    no: '03',
    label: 'Cultural Model',
    title: '中国工业博物馆文化主题产品',
    shortTitle: '工业博物馆\n模型',
    subtitle: '将国家工业文化内容转译为具备展示价值、纪念属性和传播价值的文化主题模型。',
    market: '博物馆 / 城市文化 / 文旅展示',
    category: '文化主题模型 / 建筑复刻 / 文创展示产品',
    scale: '约 0.7m x 1.2m，2 个模型',
    channel: '博物馆展示 / 文化传播 / 游客体验',
    role: '主题转译 / 产品规划 / 造型设计 / 结构验证 / 制作跟进 / 交付验收',
    image: '/images/gb1.JPG',
    gallery: [['/images/gb1.JPG', '/images/gb2.JPG'], ['/images/gb3.JPG', '/images/gb4.JPG'], ['/images/gb5.JPG', '/images/gb6.JPG']],
    highlights: ['2 个文化主题模型交付', '国家级博物馆合作', '建筑复刻类流程验证'],
    sections: [
      {
        title: 'Opportunity / 项目机会',
        text: [
          '博物馆类项目的核心，是把相对抽象的城市文化与工业记忆转化为更容易被游客理解、观看和传播的实体产品。',
          '这个项目的机会在于：通过模型化、场景化和视觉化的方式，让工业文化不只停留在文字展陈中，而成为具备纪念属性和展示价值的文化产品。',
        ],
      },
      {
        title: 'Strategy / 产品策略',
        text: [
          '我从博物馆主题内容、建筑特征、游客观看角度和展示空间出发，确定模型的表现重点和比例关系。',
          '在开发过程中，我通过数字建模和实体测试验证造型、结构、比例和细节表现，并持续平衡展示效果、制作难度、成本和交付周期。',
        ],
      },
      {
        title: 'Execution / 开发执行',
        text: [
          '项目推进覆盖资料理解、主题表达、产品形式确认、模型结构拆解、材料采购、生产制作、质量检查和最终交付。',
          '该项目不仅是单次交付，也帮助我验证了建筑复刻类文化产品从资料调研、造型转译、结构拆解到实体落地的完整流程。',
        ],
      },
      {
        title: 'Impact / 项目结果',
        text: [
          '项目完成后满足博物馆文化展示与游客体验需求，并通过与国家级博物馆合作提升了品牌曝光和媒体传播效果。项目经验也为后续文旅文创、建筑复刻和城市文化产品开发提供了可复用方法。',
        ],
      },
    ],
  },
  {
    id: 'sealife-ip',
    no: '04',
    label: 'IP Product',
    title: '海洋馆 IP 主题创意产品开发',
    shortTitle: '海洋馆 IP\n积木模型',
    subtitle: '围绕品牌 IP 视觉资产，推进形象提炼、产品策划、结构验证、供应链协同与现场交付。',
    market: '海洋馆 / 品牌 IP / 亲子游客',
    category: 'IP 积木模型 / 品牌展示 / 定制化产品',
    scale: '约 1.2m x 1.2m x 1.9m，1 个积木模型',
    channel: '海洋馆品牌展示 / IP 合作 / 游客打卡',
    role: 'IP 产品策划 / 设计开发 / 结构验证 / 供应商协调 / 成本与周期控制',
    image: '/images/shark1.png',
    gallery: [['/images/shark1.png', '/images/shark2.png']],
    highlights: ['黑鳍鲨视觉元素产品化', '跨团队协同开发', '可复用 IP 产品开发经验'],
    sections: [
      {
        title: 'Opportunity / 项目机会',
        text: [
          '海洋馆 IP 产品的核心，是将品牌识别元素转化为游客可以观看、拍照和记住的实体形象。项目以黑鳍鲨为核心视觉元素，需要在保持 IP 识别度的同时，让产品具备展示冲击力和稳定的落地能力。',
        ],
      },
      {
        title: 'Strategy / 产品策略',
        text: [
          '我先分析 IP 的视觉特征、目标用户、使用场景和展示需求，明确产品造型、尺寸、视觉重点和互动方式。',
          '在设计开发阶段，我重点验证外观表现、结构稳定性、材料选择和制作可行性，确保模型既符合品牌调性，也能满足现场长期展示要求。',
        ],
      },
      {
        title: 'Execution / 开发执行',
        text: [
          '项目推进中，我协调设计、制作、供应商及相关部门，同步推进材料、结构、灯光和展示部分，并根据反馈持续修改方案。',
          '在保证主题及视觉效果的同时，我持续控制成本与开发周期，处理需求变化及生产问题，确保最终产品符合项目要求并按期交付。',
        ],
      },
      {
        title: 'Impact / 项目结果',
        text: [
          '项目最终完成 IP 主题产品从概念策划到实体落地。上线后成为游客拍照和停留的打卡点，客户反馈良好，也沉淀了可复用的 IP 产品开发和项目管理经验。',
        ],
      },
    ],
  },
  {
    id: 'destroyer-model',
    no: '05',
    label: 'Complex Model',
    title: '055 型驱逐舰模型开发',
    shortTitle: '055 型\n驱逐舰模型',
    subtitle: '面向高密度零件与复杂结构模型，建立从结构拆解、BOM、供应链到交付的精细化开发方法。',
    market: '模型产品 / 收藏展示 / 主题内容',
    category: '积木模型 / 高复杂度结构模型 / 展示产品',
    scale: '万级颗粒模型开发与交付',
    channel: '主题展示 / 定制项目 / 模型产品开发',
    role: '产品开发 / 结构验证 / BOM 管理 / 供应链协同 / 成本优化 / 交付管理',
    image: '/images/marine2.png',
    gallery: [['/images/marine2.png', '/images/marine1.png']],
    highlights: ['万级颗粒精益 BOM', '材料成本优化约 4%', '库存准确率 98%+', '高复杂度结构与供应链调度'],
    sections: [
      {
        title: 'Opportunity / 项目机会',
        text: [
          '055 型驱逐舰模型属于高复杂度模型产品开发案例。项目价值不只在于最终造型呈现，更在于把高密度零件、异形件、定制件和结构表现转化为可采购、可分拣、可制作、可交付的产品系统。',
          '这类经验对应潮玩及 IP 衍生品产品项目经理岗位中非常关键的能力：复杂 SKU 管理、物料准确性控制、供应商交付管理和生产风险预判。',
        ],
      },
      {
        title: 'Strategy / 产品策略',
        text: [
          '项目前期，我围绕模型比例、结构稳定性、视觉还原、零件组合和制作路径进行拆解，判断哪些部分适合使用标准件，哪些部分需要定制件或替代方案。',
          '在物料侧，我建立更精细的 BOM 管理和采购路径，通过源头集采、采购排版和物料分类降低材料成本，同时减少缺件、错件和二次补货对项目进度的影响。',
        ],
      },
      {
        title: 'Execution / 开发执行',
        text: [
          '执行过程中，我关注从采购、分拣、库存、制作到交付的每一个节点。针对万级颗粒和多类型零件，使用扫码分拣、多称重预警和库存校验等方式提升物料准确率。',
          '当供应链或物料异常出现时，我会及时评估对成本、工期和制作节奏的影响，通过供应商协调、采购调整和工作重排保障项目继续推进。',
        ],
      },
      {
        title: 'Impact / 项目结果',
        text: [
          '项目最终完成复杂模型产品交付，并沉淀出高复杂度模型开发、BOM 管理和供应链协同方法。相关经验可迁移到潮玩产品中的系列款管理、零件/配件管理、供应商协作和量产交付控制。',
        ],
      },
    ],
  },
]

const capabilities = [
  ['01', '产品企划与用户洞察', '基于游客行为、节日活动、IP 主题和竞品案例识别产品机会，将用户需求转化为清晰、可执行的产品方向。'],
  ['02', 'IP 与主题产品化', '提炼 IP 视觉特征、情绪记忆点和消费场景，将品牌资产转化为可观看、可互动、可收藏的实体产品。'],
  ['03', '开发与项目管理', '推进从方案、打样、结构验证、报价、生产到交付验收的完整流程，支持多项目并行管理。'],
  ['04', '供应链与工艺协同', '对接树脂、亚克力、玻璃钢、金属结构及积木模型相关资源，协调材料、工艺、质量和交期。'],
  ['05', '商业化产品思维', '参与包装、定价、SKU、售卖、库存与销售反馈环节，关注产品从开发结果到商业表现的闭环。'],
]

const metrics = [
  ['8+', '创意实体产品开发与项目管理经验'],
  ['10+', '平均每年负责创意产品开发项目'],
  ['2-3', '通常并行管理项目数量'],
  ['98%', '库存管理准确率'],
]

function splitTitle(title) {
  return title.split('\n').map((item) => <span key={item}>{item}</span>)
}

function splitSectionTitle(title) {
  const [english, chinese] = title.split(' / ')
  return (
    <>
      <span>{english} /</span>
      <span>{chinese}</span>
    </>
  )
}

function useRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash.replace(/^#/, '') || '/'
}

function Nav({ tone = 'dark' }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['/', '首页'],
    ['/work', '作品案例'],
    ['/#about', 'About Me'],
    ['/#contact', 'Contact'],
  ]

  return (
    <header className={`site-nav ${tone}`}>
      <a className="brand" href="#/" aria-label="回到首页">
        <i />
        DONEY DONG<span>/</span>IP DERIVATIVES PM
      </a>
      <nav className="nav-links">
        {links.map(([to, label]) => <a key={to} href={`#${to}`}>{label}</a>)}
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="打开菜单"><span /><span /></button>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(([to, label], index) => <a key={to} href={`#${to}`} onClick={() => setOpen(false)}>{label}<em>0{index + 1}</em></a>)}
      </div>
    </header>
  )
}

function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#10100e')

    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100)
    camera.position.set(0, .45, 7.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.24
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.domElement.style.touchAction = 'none'
    mount.appendChild(renderer.domElement)

    const stage = new THREE.Group()
    stage.position.set(2.15, -.02, 0)
    scene.add(stage)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = .08
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.7
    controls.rotateSpeed = 1.15
    controls.minPolarAngle = Math.PI * .28
    controls.maxPolarAngle = Math.PI * .68

    const modelRoot = new THREE.Group()
    modelRoot.rotation.y = -.34
    stage.add(modelRoot)

    const loader = new GLTFLoader()
    loader.load('/models/mini.glb', (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)

      const maxAxis = Math.max(size.x, size.y, size.z) || 1
      const modelScale = 3.05 / maxAxis
      model.scale.setScalar(modelScale)
      model.position.set(
        -center.x * modelScale,
        -center.y * modelScale - .06,
        -center.z * modelScale,
      )

      model.traverse((object) => {
        if (!object.isMesh) return
        object.castShadow = true
        object.receiveShadow = true
        if (object.material) {
          object.material.needsUpdate = true
        }
      })

      modelRoot.add(model)
    })

    scene.add(new THREE.HemisphereLight('#fff7e9', '#10100e', 3))
    const key = new THREE.DirectionalLight('#ffffff', 5.6)
    key.position.set(2.5, 5.8, 4.8)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    scene.add(key)
    const rim = new THREE.PointLight('#d7ff3f', 3.2, 8)
    rim.position.set(-3.4, .9, 2.8)
    scene.add(rim)
    const fill = new THREE.PointLight('#fff3d8', 2.8, 7)
    fill.position.set(1.7, .55, 3.4)
    scene.add(fill)

    const pointer = new THREE.Vector2()
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - .5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - .5) * 2
    }

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      stage.scale.setScalar(width < 700 ? .58 : 1.12)
      stage.position.x = width < 700 ? 1.15 : 2.15
      stage.position.y = width < 700 ? -.22 : -.02
    }

    let frameId = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      stage.rotation.y = pointer.x * .24
      stage.rotation.x = pointer.y * .11
      modelRoot.position.y = Math.sin(elapsed * 1.1) * .045
      controls.update()
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    mount.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frameId)
      mount.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      controls.dispose()
      renderer.dispose()
      scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />
}

function Home() {
  return (
    <>
      <section className="hero">
        <HeroScene />
        <div className="hero-shade" />
        <Nav tone="light" />
        <div className="hero-copy">
          <p className="eyebrow accent">PORTFOLIO / IP DERIVATIVES PRODUCT PROJECT MANAGER</p>
          <h1><span>FROM</span> <span>IDEA</span><br /><i><span>TO</span> <span>MARKET.</span></i></h1>
          <p>面向潮玩及 IP 衍生品方向，展示我在产品企划、设计验证、供应链协同与实体产品交付中的系统经验。</p>
        </div>
        <a className="hero-link" href="#/case/small-products">VIEW FEATURED CASE</a>
      </section>

      <section className="intro section">
        <div className="section-index">( 01 )</div>
        <div>
          <p className="eyebrow">Positioning</p>
          <h2>潮玩及IP衍生品产品项目经理</h2>
        </div>
        <p>我拥有 8 年创意实体产品开发与项目管理经验，长期参与主题场馆、节日营销、文化展示、IP 定制及小型创意周边开发。作品集重点呈现我如何将需求拆解为产品方案，并在成本、周期、结构、工艺和用户体验之间推动项目落地。</p>
      </section>

      <section className="metrics section" aria-label="关键数据">
        {metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <WorkPreview />
      <AboutInline />
      <ContactBand />
    </>
  )
}

function WorkPreview() {
  return (
    <section className="work-band" id="work">
      <div className="work-head section">
        <div className="section-index">( 02 )</div>
        <p className="eyebrow">Selected Work / 2018-Present</p>
        <h2>PRODUCTS<br /><i>DELIVERED.</i></h2>
        <a className="text-link" href="#/work">查看全部案例</a>
      </div>
      <div className="case-grid section">
        {cases.map((item) => <CaseCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

function CaseCard({ item }) {
  return (
    <a className="case-card" href={`#/case/${item.id}`}>
      <img src={item.image} alt={item.title} />
      <div className="case-card-shade" />
      <div className="case-meta">
        <span>{item.no}</span>
        <span>{item.label}</span>
        <span>CASE STUDY</span>
      </div>
      <h3>{splitTitle(item.shortTitle)}</h3>
      <p>{item.subtitle}</p>
    </a>
  )
}

function Work() {
  return (
    <>
      <Nav />
      <main className="page">
        <section className="page-hero section">
          <p className="eyebrow">Work Index</p>
          <h1>五个精选案例，呈现创意产品从机会识别到交付验收的完整链路。</h1>
          <p>案例覆盖小型周边产品组合、IP 定制积木模型、文化主题模型、大型节日装置与复杂结构模型，重点展示产品企划、用户场景分析、设计验证、供应链协同、成本控制和项目交付能力。</p>
        </section>
        <div className="case-grid section work-index">
          {cases.map((item) => <CaseCard key={item.id} item={item} />)}
        </div>
      </main>
      <ContactBand />
    </>
  )
}

function AboutInline() {
  return (
    <section className="about-inline section" id="about">
      <div className="section-index">( 03 )</div>
      <div className="about-inline-copy">
        <p className="eyebrow">About Me</p>
        <h2>关注创意产品的完整落地链路：从机会识别、产品方案到生产交付。</h2>
        <p>曾任创意模型设计师，并在产品项目经理岗位负责创意实体产品从需求分析、产品方案、创意设计、验证、报价确认、生产执行到交付验收的完整流程。当前目标岗位为潮玩及IP衍生品产品项目经理，希望将过往在主题场景、IP 定制、文化模型和小型周边开发中的经验，迁移到更系统的潮玩产品开发与商业化工作中。</p>
      </div>
      <img src="/images/myself.jpg" alt="董祎凡" />
      <div className="capability-grid about-capabilities">
        {capabilities.map(([no, title, text]) => (
          <article key={no}>
            <small>{no} / CAPABILITY</small>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CasePage({ item }) {
  return (
    <>
      <Nav tone="light" />
      <main className="case-page">
        <section className="case-hero">
          <img src={item.image} alt={item.title} />
          <div className="case-hero-shade" />
          <div className="case-title section">
            <p className="eyebrow accent">CASE STUDY {item.no} / {item.label}</p>
            <h1>{item.title}</h1>
            <p>{item.subtitle}</p>
          </div>
        </section>

        <section className="case-facts section">
          <Fact label="Market" value={item.market} />
          <Fact label="Category" value={item.category} />
          <Fact label="Scale" value={item.scale} />
          <Fact label="Channel" value={item.channel} />
          <Fact label="Role" value={item.role} />
        </section>

        <section className="case-body section">
          <aside>
            <p className="eyebrow">Project Highlights</p>
            <ul>
              {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </aside>
          <div className="case-writing">
            {item.sections.map((section) => (
              <article key={section.title}>
                <h2>{splitSectionTitle(section.title)}</h2>
                {section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
        </section>

        <section className={`gallery section ${item.id === 'small-products' ? 'compact-gallery' : ''}`}>
          <p className="eyebrow">Project Evidence</p>
          {item.gallery.map((group, index) => (
            <figure className={`gallery-group count-${group.length}`} key={group.join('-')}>
              {group.map((image) => <img key={image} src={image} alt={`${item.title} 项目图片`} />)}
              <figcaption>PROJECT EVIDENCE / {String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </section>

        <section className="next-case section">
          <span>Next Case Study</span>
          <a href={`#/case/${nextCase(item.id).id}`}>{nextCase(item.id).title}</a>
        </section>
      </main>
      <ContactBand />
    </>
  )
}

function Fact({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  )
}

function nextCase(id) {
  const index = cases.findIndex((item) => item.id === id)
  return cases[(index + 1) % cases.length]
}

function CapabilitySection() {
  return (
    <section className="capability-section section">
      <div className="section-index">( 03 )</div>
      <div className="capability-heading">
        <p className="eyebrow">Core Capabilities</p>
        <h2>从产品机会到实体交付，建立可复用的开发、协同与复盘方法。</h2>
      </div>
      <div className="capability-grid">
        {capabilities.map(([no, title, text]) => (
          <article key={no}>
            <small>{no} / CAPABILITY</small>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactBand() {
  return (
    <footer className="contact-band" id="contact">
      <div className="footer-top">
        <span>DONEY DONG / IP DERIVATIVES PRODUCT PROJECT MANAGER</span>
        <a href="#/">BACK TO TOP</a>
      </div>
      <h2>FROM IDEA<br /><i>TO DELIVERY.</i></h2>
      <div className="contact-links">
        <a href="mailto:doney870506473@163.com"><small>邮箱</small>doney870506473@163.com</a>
        <a href="tel:+8617612442018"><small>电话</small>+86 176 1244 2018</a>
        <a href="https://www.doneydong.top"><small>网站</small>www.doneydong.top</a>
        <span><small>微信</small>870506473</span>
      </div>
    </footer>
  )
}

function App() {
  const route = useRoute()
  const caseId = route.match(/^\/case\/([^/]+)/)?.[1]
  const selectedCase = useMemo(() => cases.find((item) => item.id === caseId), [caseId])

  useEffect(() => {
    if (route === '/#about' || route === '/#contact') {
      const target = route === '/#about' ? '#about' : '#contact'
      window.setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [route])

  if (selectedCase) return <CasePage item={selectedCase} />
  if (route === '/work') return <Work />
  return <Home />
}

createRoot(document.getElementById('root')).render(<App />)
