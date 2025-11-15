export type OrbitParams = {
  semiMajorAxisKm: number
  orbitalPeriodDays: number
  inclinationDeg?: number
}

export type CelestialBody = {
  id: string
  name: string
  type: 'star' | 'planet'
  radiusKm: number
  color: string
  orbit?: OrbitParams
  rotationPeriodHours: number
  description: string
  keyFacts: string[]
}

export const bodies: CelestialBody[] = [
  {
    id: 'sun',
    name: '太阳',
    type: 'star',
    radiusKm: 696_340,
    color: '#f6c177',
    rotationPeriodHours: 648,
    description: '太阳是太阳系的中心恒星，提供光和热，驱动行星的轨道动态。',
    keyFacts: ['光谱类型：G2V', '表面温度：5778 K', '质量占太阳系 99.8%'],
  },
  {
    id: 'mercury',
    name: '水星',
    type: 'planet',
    radiusKm: 2_439.7,
    color: '#c3b8b1',
    orbit: { semiMajorAxisKm: 57_909_227, orbitalPeriodDays: 87.97, inclinationDeg: 7 },
    rotationPeriodHours: 1407.6,
    description: '最靠近太阳的行星，表面布满陨石坑，昼夜温差极端。',
    keyFacts: ['无大气层', '探索任务：信使号', '太阳日≈176个地球日'],
  },
  {
    id: 'venus',
    name: '金星',
    type: 'planet',
    radiusKm: 6_051.8,
    color: '#f4d29c',
    orbit: { semiMajorAxisKm: 108_209_475, orbitalPeriodDays: 224.7, inclinationDeg: 3.4 },
    rotationPeriodHours: -5832.5,
    description: '厚重的二氧化碳大气与硫酸云层形成温室地狱，被称为地球的“孪生姐妹”。',
    keyFacts: ['逆行自转', '表面温度约 465°C', '探索任务：金星快车'],
  },
  {
    id: 'earth',
    name: '地球',
    type: 'planet',
    radiusKm: 6_371,
    color: '#6ec5e9',
    orbit: { semiMajorAxisKm: 149_598_023, orbitalPeriodDays: 365.256, inclinationDeg: 0 },
    rotationPeriodHours: 23.93,
    description: '目前已知唯一存在生命的行星，拥有液态水和复杂生态系统。',
    keyFacts: ['拥有大型天然卫星——月球', '71% 被海洋覆盖', '大气含氧约 21%'],
  },
  {
    id: 'mars',
    name: '火星',
    type: 'planet',
    radiusKm: 3_389.5,
    color: '#e2725b',
    orbit: { semiMajorAxisKm: 227_939_200, orbitalPeriodDays: 686.98, inclinationDeg: 1.85 },
    rotationPeriodHours: 24.62,
    description: '红色行星，富含铁锈尘埃，拥有太阳系最高的火山奥林匹斯山。',
    keyFacts: ['稀薄二氧化碳大气', '存在季节性极冠', '多项漫游者任务正在进行'],
  },
  {
    id: 'jupiter',
    name: '木星',
    type: 'planet',
    radiusKm: 69_911,
    color: '#f0b17a',
    orbit: { semiMajorAxisKm: 778_299_000, orbitalPeriodDays: 4332.59, inclinationDeg: 1.3 },
    rotationPeriodHours: 9.93,
    description: '太阳系质量最大的行星，著名的大红斑持续存在数百年。',
    keyFacts: ['拥有 90+ 已确认卫星', '主要成分为氢/氦', '强磁场与辐射带'],
  },
  {
    id: 'saturn',
    name: '土星',
    type: 'planet',
    radiusKm: 58_232,
    color: '#f3e0a1',
    orbit: { semiMajorAxisKm: 1_433_449_370, orbitalPeriodDays: 10_759, inclinationDeg: 2.49 },
    rotationPeriodHours: 10.7,
    description: '以壮观的行星环闻名，环由冰和岩石颗粒构成。',
    keyFacts: ['密度小于水', '卡西尼号提供大量数据', '已知卫星超过 140 颗'],
  },
  {
    id: 'uranus',
    name: '天王星',
    type: 'planet',
    radiusKm: 25_362,
    color: '#9fd0e4',
    orbit: { semiMajorAxisKm: 2_872_460_000, orbitalPeriodDays: 30_688, inclinationDeg: 0.77 },
    rotationPeriodHours: -17.24,
    description: '自转轴几乎平躺，导致极端季节变化，呈淡蓝绿色。',
    keyFacts: ['由冰巨行星组成', '只有旅行者 2 号近距飞掠', '磁场不对称'],
  },
  {
    id: 'neptune',
    name: '海王星',
    type: 'planet',
    radiusKm: 24_622,
    color: '#5f88d5',
    orbit: { semiMajorAxisKm: 4_498_396_441, orbitalPeriodDays: 60_182, inclinationDeg: 1.77 },
    rotationPeriodHours: 16.11,
    description: '风速可达 2,100 km/h 的蓝色巨人，拥有暗斑风暴。',
    keyFacts: ['最外层的巨行星', '主要由氢、氦、甲烷构成', '探索数据来自旅行者 2 号'],
  },
]

export const bodyMap: Record<string, CelestialBody> = Object.fromEntries(
  bodies.map((body) => [body.id, body]),
) as Record<string, CelestialBody>
