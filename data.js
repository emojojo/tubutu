
export const cities = [
  { id: 'beijing', name: '北京', lat: 39.9042, lon: 116.4074 },
  { id: 'shanghai', name: '上海', lat: 31.2304, lon: 121.4737 },
  { id: 'guangzhou', name: '广州', lat: 23.1291, lon: 113.2644 },
  { id: 'shenzhen', name: '深圳', lat: 22.5431, lon: 114.0579 },
  { id: 'chengdu', name: '成都', lat: 30.5723, lon: 104.0665 },
  { id: 'hangzhou', name: '杭州', lat: 30.2741, lon: 120.1551 },
  { id: 'wuhan', name: '武汉', lat: 30.5928, lon: 114.3055 },
  { id: 'xian', name: '西安', lat: 34.3416, lon: 108.9398 },
  { id: 'chongqing', name: '重庆', lat: 29.5630, lon: 106.5516 },
  { id: 'nanjing', name: '南京', lat: 32.0603, lon: 118.7969 },
  { id: 'kunming', name: '昆明', lat: 25.0406, lon: 102.7123 },
  { id: 'haerbin', name: '哈尔滨', lat: 45.8038, lon: 126.5350 },
  { id: 'wulumuqi', name: '乌鲁木齐', lat: 43.8256, lon: 87.6168 }
];

export const regions = [
  { id: 'north', name: '华北及东北地区 (北京、天津、河北、山西、内蒙古、辽宁、吉林、黑龙江)', desc: '四季分明，冬季寒冷。露天主打春播夏收或夏秋播种。' },
  { id: 'south', name: '华南及江南地区 (广东、广西、海南、福建、台湾)', desc: '温暖湿润，无霜期长。露天几乎全年可种，夏季需注意防暴雨。' },
  { id: 'east', name: '华东及长江中下游 (上海、江苏、浙江、安徽、江西、山东、河南、湖北、湖南)', desc: '气候温和，四季分明，梅雨季节露天需注意田间防涝。' },
  { id: 'southwest', name: '西南地区 (重庆、四川、贵州、云南、西藏)', desc: '立体气候显著。四川盆地湿润，云贵高原温和光照充足。' },
  { id: 'northwest', name: '西北地区 (陕西、甘肃、青海、宁夏、新疆)', desc: '光照充足，昼夜温差大，干旱。露天极度适合瓜果积累糖分。' }
];

export const categories = [
  { id: 'leafy', name: '叶菜类', icon: '🥬' },
  { id: 'brassica', name: '甘蓝花菜类', icon: '🥦' },
  { id: 'solanaceous', name: '茄果类', icon: '🍅' },
  { id: 'root', name: '根茎类', icon: '🥕' },
  { id: 'cucurbits', name: '瓜菜类', icon: '🥒' },
  { id: 'fruit', name: '水果', icon: '🍉' },
  { id: 'legumes', name: '豆类', icon: '🫘' },
  { id: 'allium', name: '葱蒜类', icon: '🧄' }
];

export const vegetables = [
  // ================= 水果 (Fruits) =================
  {
    id: 'watermelon',
    avatar: 'assets/icons/icon_watermelon.png',
    name: '西瓜',
    baseTemp: 12, categoryId: 'fruit',
    icon: '🍉',
    image: 'images/crop_watermelon.png',
    description: '喜温耐热，需强光照。西北地区露天种植糖度极高，有机种植需注意轮作防枯萎病。',
    calendar: {
      north: '4月中下旬地膜覆盖直播，或5月露地直播。',
      south: '2-3月春播，7-8月秋播。',
      east: '3月下旬至4月上旬露天播种。',
      southwest: '3-4月播种。',
      northwest: '4月下旬至5月上旬（昼夜温差大，极佳）。'
    },
    stages: [
      {
        name: '发芽与出苗期',
        water_fertilizer: '播种前浇透底水，出苗前保持土壤湿润。出苗后适当控水，防止徒长。',
        pest_management: '注意防范苗期猝倒病，可通过撒施干草木灰降低湿度。',
        pruning_trellising: null
      },
      {
        name: '幼苗期 (定植与蹲苗)',
        water_fertilizer: '定植缓苗后浇一次稀薄缓苗水。之后严格控水“蹲苗”，促进根系深扎。',
        pest_management: '预防蚜虫传播病毒病，可悬挂黄板。',
        pruning_trellising: '定植可地爬（株距0.8-1m）或搭架（立体种植，节约空间，搭设1.5-2m高人字架）。',
        pruning_image: 'images/stages/stage_watermelon_plant.png'
      },
      {
        name: '抽蔓期',
        water_fertilizer: '蔓长30cm左右时，追施一次促蔓肥（以氮钾为主），并配合浇水。之后再次控水。',
        pest_management: '重点预防蔓枯病，注意田间通风，发现病斑可用草木灰涂抹。',
        pruning_trellising: '【地爬】采用“三蔓整枝”（主蔓+2侧蔓）；【搭架】采用“双蔓整枝”（主蔓+1侧蔓）。多余侧蔓尽早剪除。搭架需及时绑蔓。',
        pruning_image: 'images/stages/stage_watermelon_prune.png'
      },
      {
        name: '开花结果期',
        water_fertilizer: '开花期控水防化瓜；当果实膨大至鸡蛋大小时，重施高钾水溶肥或草木灰水（膨瓜肥）；采收前10天严格控水以提高糖度。忌偏施氮肥。',
        water_image: 'images/stages/stage_watermelon_fertilize.png',
        pest_management: '防范枯萎病、白粉病和瓜实蝇。及时清理黄叶老叶改善通风。',
        pruning_trellising: '清晨6-9点进行人工辅助授粉。每株保留1-2个形态周正的瓜，其余幼瓜及早摘除以集中养分。主蔓长至25节左右打顶摘心。',
        pruning_image: 'images/stages/stage_watermelon_pollinate.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/watermelon_v3_stage_1_1779709382535.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/watermelon_v3_stage_2_1779709396968.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/watermelon_v3_stage_3_1779709410977.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/watermelon_v3_stage_4_1779709428276.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/watermelon_v3_stage_5_1779709444492.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/watermelon_v3_stage_6_1779709460924.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/watermelon_v3_stage_7_1779709474087.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '枯萎病',
                cause: '典型土传病害，重茬连作、土壤积水、根系受伤都会诱发此病。',
                prevention: '实行3-5年轮作，使用嫁接苗（如南瓜根接西瓜），避免偏施氮肥。',
                image: 'images/pest_watermelon_fusarium.png'
            },
            {
                name: '蔓枯病',
                cause: '田间湿度过大、种植过密、通风透光差，或偏施氮肥导致植株徒长时易发。',
                prevention: '轮作，避免偏施氮肥，保持田间通风透光，用草木灰涂抹病斑。',
                image: 'images/pest_wintermelon_blight.png'
            },
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '守瓜',
                cause: '成虫越冬后在春季气温回升时活动，喜欢啃食瓜类幼苗叶片，产卵于根部。',
                prevention: '清晨露水未干时捕杀成虫，根部撒草木灰防止产卵。',
                image: 'images/pest_radish_fleabeetle.png'
            }
        ]
  },
  {
    id: 'melon',
    avatar: 'assets/icons/icon_melon.png',
    name: '羊角蜜/甜瓜',
    baseTemp: 12, categoryId: 'fruit',
    icon: '🍈',
    image: 'images/crop_melon.png',
    description: '薄皮甜瓜，香甜多汁，喜光耐旱，极不耐涝。',
    calendar: {
      north: '晚霜后4月下旬至5月露天播种。',
      south: '2-4月春播（夏季高温多雨易裂果病害）。',
      east: '4月上中旬播种。',
      southwest: '3-5月播种。',
      northwest: '4-5月（气候最适宜甜瓜生长）。'
    },
    stages: [
      {
        name: '幼苗期 (定植与缓苗)',
        water_fertilizer: '定植后浇透水，缓苗后适当控水促进根系下扎。',
        pest_management: '防范苗期立枯病，预防蚜虫。',
        pruning_trellising: '推荐搭架吊蔓种植（1.8-2m高铁丝/尼龙绳），采光好且防烂瓜；也可地爬种植（需铺草防地雷瓜）。',
        pruning_image: 'images/stages/melon_0_v3_1779513847521.png'
      },
      {
        name: '抽蔓期',
        water_fertilizer: '伸蔓期追施一次伸蔓肥（均衡型复混肥），保持土壤见干见湿。',
        pest_management: '重点防范白粉病、蔓枯病。',
        pruning_trellising: '【吊蔓单干整枝】：主蔓向上牵引，摘除10节以下所有侧枝；11-15节留侧枝结果，果前留1-2叶摘心。主蔓至25节左右打顶。【地爬】：常采用“双蔓或三蔓整枝”。',
        pruning_image: 'images/stages/melon_1_v3_1779513861324.png'
      },
      {
        name: '开花结果期',
        water_fertilizer: '坐果后进入膨大期，立即追施膨瓜肥（腐熟饼肥水或高钾肥），配合叶面喷施磷酸二氢钾，采收前10天断水。',
        water_image: 'images/stages/melon_3_v3_1779513893106.png',
        pest_management: '防范果实腐烂病、白粉病。',
        pruning_trellising: '羊角蜜等甜瓜主要靠侧枝结瓜，雌花开放时需在上午进行人工授粉。',
        pruning_image: 'images/stages/melon_2_v3_1779513877039.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/melon_v3_stage_1_1779710563597.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/melon_v3_stage_2_1779710579005.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/melon_v3_stage_3_1779710594269.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/melon_v3_stage_4_1779710611647.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/melon_v3_stage_5_1779710627545.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/melon_v3_stage_6_1779710642557.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/melon_v3_stage_7_1779710660882.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '蔓枯病',
                cause: '田间湿度过大、种植过密、通风透光差，或偏施氮肥导致植株徒长时易发。',
                prevention: '控制湿度，避免漫灌，发病初期可用草木灰涂抹茎部。',
                image: 'images/pest_wintermelon_blight.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            }
        ]
  },
  {
    id: 'strawberry',
    avatar: 'assets/icons/icon_strawberry.png',
    name: '草莓',
    baseTemp: 12, categoryId: 'fruit',
    icon: '🍓',
    image: 'images/crop_strawberry.png',
    description: '喜温凉，不耐高温。露天有机种植香气浓郁，但需注意防鸟和防灰霉病。',
    calendar: {
      north: '8-9月秋季定植，次年春末夏初收获。',
      south: '9-10月定植，冬春季收获。',
      east: '9-10月定植，次年4-5月采收。',
      southwest: '秋季定植。',
      northwest: '8月下旬定植。'
    },
    stages: [
      {
        name: '幼苗期 (定植与缓苗)',
        water_fertilizer: '定植前底肥必须施足充分发酵好的羊粪。定植后浇透水，缓苗期间保持土壤湿润，不能缺水。',
        pest_management: '预防红蜘蛛和根腐病。',
        pruning_trellising: '必须采用高垄种植（垄高30cm以上），“深不埋心，浅不露根”，并铺设黑色地膜（防草、保温、保肥）。',
        pruning_image: 'images/stages/strawberry_0_v3_1779513907840.png'
      },
      {
        name: '旺盛生长期',
        water_fertilizer: '新叶长出后，可少量追施平衡肥。保持水分供应但忌积水。',
        pest_management: '防范白粉病、蚜虫。',
        pruning_trellising: '及时摘除老叶、病叶，改善植株通风透光。',
        pruning_image: null
      },
      {
        name: '开花结果期',
        water_fertilizer: '开花前和果实膨大期，结合滴灌追施高磷高钾水溶有机肥（如海藻酸、鱼蛋白液肥）以提升果实风味和甜度。',
        water_image: 'images/stages/strawberry_2_v3_1779513936502.png',
        pest_management: '重点防范灰霉病（降低田间湿度），防鸟。',
        pruning_trellising: '结果时需将果穗理到膜上，绝对避免果实直接接触湿润泥土引起烂果。开花结果期间不断长出的匍匐茎，应立刻贴根掐断。',
        pruning_image: 'images/stages/strawberry_1_v3_1779513923046.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/strawberry_v3_stage_1_1779710715671.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/strawberry_v3_stage_2_1779710729785.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/strawberry_v3_stage_3_1779710744355.png', days: 20, gdd: 300  },
      { name: '展叶', image: 'images/strawberry_v3_stage_4_1779710755820.png', days: 15, gdd: 225  },
      { name: '开花', image: 'images/strawberry_v3_stage_5_1779710769883.png', days: 15, gdd: 225  },
      { name: '结果', image: 'images/strawberry_v3_stage_6_1779710785239.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/strawberry_v3_stage_7_1779710805797.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免苗期过度拥挤，育苗地避雨栽培，发病初期摘除病叶。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '释放丽蚜小蜂，挂黄板。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '根腐病',
                cause: '土壤黏重、排水不良、长期连作或土温偏低时，真菌从根部侵入导致腐烂。',
                prevention: '高垄栽培，避免田间积水，使用哈茨木霉菌灌根。',
                image: 'images/pest_cabbage_softrot.png'
            }
        ]
  },

  // ================= 甘蓝花菜类 (Brassicas) =================
  {
    id: 'broccoli',
    avatar: 'assets/icons/icon_broccoli.png',
    name: '西兰花',
    baseTemp: 5, categoryId: 'brassica',
    icon: '🥦',
    image: 'images/crop_broccoli.png',
    description: '喜冷凉，不耐高温干旱，营养极高，有机防虫是关键。',
    calendar: {
      north: '3-4月春播，或7月夏播秋收。',
      south: '9月至次年1月均可播种。',
      east: '7-8月秋播，或1-2月春播。',
      southwest: '春秋两季。',
      northwest: '5-6月播种。'
    },
    stages: [
      { name: '水肥管理', content: '需水量大，全生育期需保持土壤见干见湿，避免极度干旱。' , image: 'images/stages/broccoli_0_v3_1779513959706.png' },
      { name: '特殊追肥 🌟', content: '当中心花球出现（约纽扣大小）时，是需肥临界期，必须重施一次速效高氮高钾有机肥，以促使花球迅速膨大、紧实。缺肥会导致花球松散早生花。' , image: 'images/stages/broccoli_1_v3_1779513973559.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/broccoli_v3_stage_1_1779704201963.png' },
      { days: 5, gdd: 75, name: '出苗期', image: 'images/broccoli_v3_stage_2_1779704217121.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/broccoli_v3_stage_3_1779704230584.png' },
      { days: 35, gdd: 525, name: '莲座期', image: 'images/broccoli_v3_stage_4_1779704248062.png' },
      { days: 55, gdd: 825, name: '现蕾期', image: 'images/broccoli_v3_stage_5_1779704266920.png' },
      { days: 70, gdd: 1050, name: '膨大期', image: 'images/broccoli_v3_stage_6_1779704281851.png' },
      { days: 85, gdd: 1275, name: '采收期', image: 'images/broccoli_v3_stage_7_1779704297567.png' }
    ],
    pests: [
            {
                name: '菜青虫',
                cause: '十字花科作物连作地块多发，菜粉蝶产卵孵化，幼虫食量惊人。',
                prevention: '手工捕捉虫卵和幼虫，喷施苏云金杆菌(Bt)生物农药。',
                image: 'images/pest_cabbage_caterpillar.png'
            },
            {
                name: '小菜蛾 (吊丝虫)',
                cause: '喜欢干燥环境，长期连作十字花科会导致其抗药性增强，难以根除。',
                prevention: '使用苏云金杆菌(Bt)，安装黑光灯诱杀成虫，避免十字花科连作。',
                image: 'images/pest_diamondback_moth.png'
            },
            {
                name: '跳甲',
                cause: '干旱少雨、十字花科连作地块多发，成虫善跳跃，啃食叶片成密孔。',
                prevention: '播种前深翻土壤晾晒，幼苗期覆盖防虫网，叶面撒草木灰驱避。',
                image: 'images/pest_radish_fleabeetle.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '黑腐病',
                cause: '细菌性病害，多在高温多雨季发生，主要通过雨水飞溅或昆虫从伤口侵入。',
                prevention: '避免与同科作物连作，种子温汤浸种，雨后及时排水防涝。',
                image: 'images/pest_radish_blackrot.png'
            },
            {
                name: '根肿病',
                cause: '土壤偏酸性、地势低洼积水、长期连作十字花科的土壤中病菌极易存活传播。',
                prevention: '施用生石灰调节土壤pH至弱碱性，实行5年以上非十字花科轮作。',
                image: 'images/pest_cabbage_softrot.png'
            },
            {
                name: '软腐病',
                cause: '细菌性病害，多在湿度大且植株有机械伤口或虫咬伤口时，病菌趁虚而入。',
                prevention: '防治害虫以减少伤口，高垄栽培，避免田间积水，拔除病株并在病穴撒生石灰。',
                image: 'images/pest_cabbage_softrot.png'
            }
        ]
  },
  {
    id: 'cabbage_head',
    avatar: 'assets/icons/icon_cabbage_head.png',
    name: '包菜 (结球甘蓝)',
    baseTemp: 5, categoryId: 'brassica',
    icon: '🥬',
    image: 'images/crop_cabbage.png',
    description: '极耐寒耐储运，适应性极强，露天种植的优良十字花科作物。',
    calendar: {
      north: '春甘蓝2-3月育苗，秋甘蓝6-7月育苗。',
      south: '8月至次年2月均可播种。',
      east: '春秋两季均可。',
      southwest: '高海拔夏季可种，盆地秋冬春。',
      northwest: '5-6月播种。'
    },
    stages: [
      { name: '水分控制', content: '结球前期叶面积急速扩张，需水最多，必须保持土壤湿润；但在结球后期必须严格控制水分，防止水分过大导致菜头开裂（裂球）。' , image: 'images/stages/cabbage_head_0_v3_1779513987976.png' },
      { name: '特殊追肥 🌟', content: '在“莲座期”（外层叶片大量展开铺满地）和“结球初期”，是干物质积累关键期，需连续重施2次富含氮钾的腐熟液肥。' , image: 'images/stages/cabbage_head_1_v3_1779514003067.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/cabbage_head_v3_stage_1_1779704310656.png' },
      { days: 5, gdd: 75, name: '出苗期', image: 'images/cabbage_head_v3_stage_2_1779704323314.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/cabbage_head_v3_stage_3_1779704336903.png' },
      { days: 35, gdd: 525, name: '莲座期', image: 'images/cabbage_head_v3_stage_4_1779704350154.png' },
      { days: 55, gdd: 825, name: '结球初期', image: 'images/cabbage_head_v3_stage_5_1779704364071.png' },
      { days: 75, gdd: 1125, name: '结球盛期', image: 'images/cabbage_head_v3_stage_6_1779704378100.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/cabbage_head_v3_stage_7_1779704391362.png' }
    ],
    pests: [
            {
                name: '菜青虫',
                cause: '十字花科作物连作地块多发，菜粉蝶产卵孵化，幼虫食量惊人。',
                prevention: '手工捕捉虫卵和幼虫，喷施苏云金杆菌(Bt)生物农药。',
                image: 'images/pest_cabbage_caterpillar.png'
            },
            {
                name: '小菜蛾 (吊丝虫)',
                cause: '喜欢干燥环境，长期连作十字花科会导致其抗药性增强，难以根除。',
                prevention: '使用苏云金杆菌(Bt)，安装黑光灯诱杀成虫，避免十字花科连作。',
                image: 'images/pest_diamondback_moth.png'
            },
            {
                name: '跳甲',
                cause: '干旱少雨、十字花科连作地块多发，成虫善跳跃，啃食叶片成密孔。',
                prevention: '播种前深翻土壤晾晒，幼苗期覆盖防虫网，叶面撒草木灰驱避。',
                image: 'images/pest_radish_fleabeetle.png'
            },
            {
                name: '菜螟',
                cause: '高温干旱天气易发，幼虫钻蛀入幼苗心叶内吐丝结网并取食。',
                prevention: '利用防虫网覆盖，发病初期及时摘除虫心，灌水淹死土壤中的蛹。',
                image: 'images/pest_cabbage_caterpillar.png'
            },
            {
                name: '软腐病',
                cause: '细菌性病害，多在湿度大且植株有机械伤口或虫咬伤口时，病菌趁虚而入。',
                prevention: '防治害虫以减少伤口，高垄栽培，避免田间积水，拔除病株并在病穴撒生石灰。',
                image: 'images/pest_cabbage_softrot.png'
            },
            {
                name: '黑腐病',
                cause: '细菌性病害，多在高温多雨季发生，主要通过雨水飞溅或昆虫从伤口侵入。',
                prevention: '避免与同科作物连作，种子温汤浸种，雨后及时排水防涝。',
                image: 'images/pest_radish_blackrot.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            }
        ]
  },
  {
    id: 'cauliflower',
    avatar: 'assets/icons/icon_cauliflower.png',
    name: '花菜 (花椰菜)',
    baseTemp: 5, categoryId: 'brassica',
    icon: '🥦',
    image: 'images/crop_cauliflower.png',
    description: '对温度敏感，需在适宜温度下才能结出紧实洁白的花球。',
    calendar: {
      north: '春季或秋季，避开炎夏。',
      south: '秋播为主，冬春收获。',
      east: '7-8月播种。',
      southwest: '春秋两季。',
      northwest: '4-5月播种。'
    },
    stages: [
      { name: '折叶盖花', content: '花菜特有步骤：当白色花球长至拳头大小时，需折断1-2片外部老叶，将其覆盖在花球上，防止阳光直射导致白花球变黄、变散，影响品质。' , image: 'images/stages/cauliflower_0_v3_1779514018646.png' },
      { name: '特殊追肥 🌟', content: '花球初现时追施膨大肥。花椰菜对【硼元素】极度敏感，缺硼极易导致花球空心、茎部开裂或表面褐斑，强烈建议在结球期叶面喷施硼砂溶液2-3次。' , image: 'images/stages/cauliflower_1_v3_1779514031724.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/cauliflower_v3_stage_1_1779704407223.png' },
      { days: 5, gdd: 75, name: '出苗期', image: 'images/cauliflower_v3_stage_2_1779704421992.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/cauliflower_v3_stage_3_1779704437834.png' },
      { days: 35, gdd: 525, name: '莲座期', image: 'images/cauliflower_v3_stage_4_1779704451766.png' },
      { days: 55, gdd: 825, name: '现蕾期', image: 'images/cauliflower_v3_stage_5_1779704466832.png' },
      { days: 75, gdd: 1125, name: '膨大期', image: 'images/cauliflower_v3_stage_6_1779704487261.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/cauliflower_v3_stage_7_1779704502215.png' }
    ],
    pests: [
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '菜青虫',
                cause: '十字花科作物连作地块多发，菜粉蝶产卵孵化，幼虫食量惊人。',
                prevention: '手工捕捉虫卵和幼虫，喷施苏云金杆菌(Bt)生物农药。',
                image: 'images/pest_cabbage_caterpillar.png'
            },
            {
                name: '跳甲',
                cause: '干旱少雨、十字花科连作地块多发，成虫善跳跃，啃食叶片成密孔。',
                prevention: '播种前深翻土壤晾晒，幼苗期覆盖防虫网，叶面撒草木灰驱避。',
                image: 'images/pest_radish_fleabeetle.png'
            },
            {
                name: '黑腐病',
                cause: '细菌性病害，多在高温多雨季发生，主要通过雨水飞溅或昆虫从伤口侵入。',
                prevention: '避免与同科作物连作，种子温汤浸种，雨后及时排水防涝。',
                image: 'images/pest_radish_blackrot.png'
            },
            {
                name: '根肿病',
                cause: '土壤偏酸性、地势低洼积水、长期连作十字花科的土壤中病菌极易存活传播。',
                prevention: '施用生石灰调节土壤pH至弱碱性，实行5年以上非十字花科轮作。',
                image: 'images/pest_cabbage_softrot.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '软腐病',
                cause: '细菌性病害，多在湿度大且植株有机械伤口或虫咬伤口时，病菌趁虚而入。',
                prevention: '防治害虫以减少伤口，高垄栽培，避免田间积水，拔除病株并在病穴撒生石灰。',
                image: 'images/pest_cabbage_softrot.png'
            }
        ]
  },

  // ================= 叶菜类 (Leafy) =================
  {
    id: 'leek_chinese',
    avatar: 'assets/icons/icon_leek_chinese.png',
    name: '韭菜',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🌿',
    image: 'images/main_leek_realistic.png',
    description: '多年生宿根蔬菜，一次种植多年采收。露天适应性极强。',
    calendar: {
      north: '4-5月春播，或秋季播种。',
      south: '四季均可，春秋最佳。',
      east: '春秋两季。',
      southwest: '春秋两季。',
      northwest: '5-6月播种。'
    },
    stages: [
      { name: '割后管理', content: '收割（“割韭菜”）时留茬 2-3cm，绝不可贴地或挖根收割，以免损伤鳞茎。收割后切忌立即浇水，必须等待2-3天伤口彻底愈合后再浇水施肥，防止烂根。' , image: 'images/stages/leek_chinese_harvest_v3.png' },
      { name: '特殊追肥 🌟', content: '每收割一茬并缓苗后，必须重施一次腐熟人畜粪肥或豆饼水，俗称“刀刀肥”，才能保证下一茬依然粗壮翠绿。' , image: 'images/stages/leek_chinese_fertilize_v3.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/leek_v3_stage_1_1779690617984.png' },
      { days: 10, gdd: 150, name: '出苗期', image: 'images/leek_v3_stage_2_1779690631513.png' },
      { days: 25, gdd: 375, name: '幼苗前期', image: 'images/leek_v3_stage_3_1779690646498.png' },
      { days: 40, gdd: 600, name: '幼苗后期', image: 'images/leek_v3_stage_4_1779690660722.png' },
      { days: 60, gdd: 900, name: '旺盛生长期', image: 'images/leek_v3_stage_5_1779690678105.png' },
      { days: 80, gdd: 1200, name: '初收期', image: 'images/leek_v3_stage_6_1779690693708.png' },
      { days: 100, gdd: 1500, name: '盛收期', image: 'images/leek_v3_stage_7_1779690708238.png' }
    ],
    pests: [
            {
                name: '韭蛆 (根蛆)',
                cause: '施用未充分腐熟的有机肥会招来成蝇产卵，幼虫在地下啃食根茎。',
                prevention: '夏季高温揭膜暴晒土壤，或者使用糖醋液诱杀成虫，撒草木灰。',
                image: 'images/pest_leek_maggot.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            },
            {
                name: '疫病',
                cause: '雨水多、湿度大、地势低洼积水的情况下最易爆发，病菌随水传播。',
                prevention: '雨季做好排水，收割后伤口愈合前避免浇水。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '葱潜叶蝇',
                cause: '春末夏初多发，成虫在叶组织内产卵，幼虫潜行取食形成灰白色蛇形虫道。',
                prevention: '悬挂黄板，及时剪除带虫道的韭菜叶。',
                image: 'images/pest_tomato_leafminer.png'
            }
        ]
  },
  {
    id: 'water_spinach',
    avatar: 'assets/icons/icon_water_spinach.png',
    name: '空心菜 (蕹菜)',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🥬',
    image: 'images/crop_waterspinach.png',
    description: '极度喜高温多湿，极不耐寒。夏季露天生长极快。',
    calendar: {
      north: '晚霜后5-6月播种，夏秋收获。',
      south: '3-9月均可播种。',
      east: '4-8月。',
      southwest: '4-8月。',
      northwest: '6-7月（生长期短）。'
    },
    stages: [
      { name: '采收打顶', content: '主茎长至25-30cm时进行第一次采摘，注意采摘时基部必须留 2-3 个节位，以促发侧枝。后续采摘同样保留新长出的侧枝基部节位。' , image: 'images/stages/water_spinach_harvest_v3.png' },
      { name: '特殊追肥 🌟', content: '空心菜极度喜水喜氮。基本原则是“每采收一次，追施一次速效氮肥液”，只要水分充足、氮肥跟上，即可实现无限采收。' , image: 'images/stages/water_spinach_fertilize_v3.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/water_spinach_v3_stage_1_1779690721705.png' },
      { days: 5, gdd: 75, name: '出苗期', image: 'images/water_spinach_v3_stage_2_1779690735412.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/water_spinach_v3_stage_3_1779690751351.png' },
      { days: 25, gdd: 375, name: '拔节生长期', image: 'images/water_spinach_v3_stage_4_1779690766117.png' },
      { days: 35, gdd: 525, name: '旺盛生长期', image: 'images/water_spinach_v3_stage_5_1779690780220.png' },
      { days: 45, gdd: 675, name: '初收期', image: 'images/water_spinach_v3_stage_6_1779690794433.png' },
      { days: 55, gdd: 825, name: '分枝生长期', image: 'images/water_spinach_v3_stage_7_1779690808205.png' }
    ],
    pests: [
            {
                name: '白锈病',
                cause: '温暖、高湿、多雾多露的天气极易诱发，孢子可随风长距离传播。',
                prevention: '避免偏施氮肥，保持株间通风，雨后及时排水。',
                image: 'images/pest_waterspinach_whiterust.png'
            },
            {
                name: '卷叶虫',
                cause: '夏秋季高温多雨时易发，成虫产卵后幼虫吐丝将叶片卷起并在其中啃食。',
                prevention: '人工捏死卷叶内的幼虫，发病初期喷施Bt生物农药。',
                image: 'images/pest_okra_leaffolder.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '蜗牛/蛞蝓',
                cause: '喜阴暗潮湿环境，多在雨后或夜间出来啃食作物幼芽和叶片，常留有银色黏液痕迹。',
                prevention: '撒施草木灰或碎鸡蛋壳，或者用啤酒陷阱诱杀。',
                image: 'images/pest_tomato_fruitworm.png'
            }
        ]
  },
  {
    id: 'amaranth',
    name: '苋菜',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🍃',
    avatar: 'assets/icons/icon_amaranth.png',
    image: 'images/crop_amaranth.png',
    description: '喜温暖，耐热耐旱，生长极快，病虫害极少，夏季绿叶菜主力。',
    calendar: {
      north: '5-8月露地播种。',
      south: '3-9月均可。',
      east: '4-8月。',
      southwest: '4-8月。',
      northwest: '5-7月。'
    },
    stages: [
      { name: '间拔采收', content: '生长较快，株高15-20cm时即可开始采收。通常采用“间拔”方式，先拔除密集的、较大的植株，留下小苗继续生长。' , image: 'images/stages/amaranth_harvest_v3.png' },
      { name: '特殊追肥 🌟', content: '以速效氮肥为主，遵循“多次少量”原则。结合浇水施用腐熟的稀薄粪水，可使叶片更为鲜嫩。' , image: 'images/stages/amaranth_fertilize_v3.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/amaranth_v3_stage_1_1779655355486.png' },
      { days: 3, gdd: 45, name: '出苗期', image: 'images/amaranth_v3_stage_2_1779655367730.png' },
      { days: 7, gdd: 105, name: '幼苗期', image: 'images/amaranth_v3_stage_3_1779655388529.png' },
      { days: 14, gdd: 210, name: '生长期', image: 'images/amaranth_v3_stage_4_1779655401010.png' },
      { days: 21, gdd: 315, name: '旺盛生长期', image: 'images/amaranth_v3_stage_5_1779655415225.png' },
      { days: 30, gdd: 450, name: '初收期', image: 'images/amaranth_v3_stage_6_1779655429771.png' },
      { days: 40, gdd: 600, name: '采收期', image: 'images/amaranth_v3_stage_7_1779655444753.png' }
    ],
    pests: [
            {
                name: '白锈病',
                cause: '温暖、高湿、多雾多露的天气极易诱发，孢子可随风长距离传播。',
                prevention: '密植时注意通风透光，喷洒波尔多液进行防护。',
                image: 'images/pest_waterspinach_whiterust.png'
            },
            {
                name: '甜菜夜蛾',
                cause: '高温干旱天气易发爆发，具有暴食性和杂食性，幼虫主要在夜间疯狂取食。',
                prevention: '夜间人工捕杀，或使用核型多角体病毒(NPV)生物药剂。',
                image: 'images/pest_beet_armyworm.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '地下害虫 (地老虎)',
                cause: '杂草丛生、土壤潮湿的地块多发，幼虫白天潜伏土中，夜间出来切断幼苗。',
                prevention: '清晨挖土捕杀幼虫，深翻土壤晾晒。',
                image: 'images/pest_beet_armyworm.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            }
        ]
  },
  {
    id: 'crown_daisy',
    avatar: 'assets/icons/icon_crown_daisy.png',
    name: '茼蒿',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🌿',
    image: 'images/crop_crowndaisy.png',
    description: '半耐寒，喜冷凉，有特异气味，病虫极少。',
    calendar: {
      north: '4-5月春播，8-9月秋播。',
      south: '9月至次年3月。',
      east: '春秋两季。',
      southwest: '春秋两季。',
      northwest: '5-7月。'
    },
    stages: [
      { name: '采收方式', content: '可分为一次性连根拔起采收，或在株高20cm时在离地2-3cm处平茬割收（类似韭菜），割收后会迅速萌发新侧枝。' , image: 'images/stages/crown_daisy_harvest_v3.png' },
      { name: '特殊追肥 🌟', content: '若是割收品种，每采收一次并等待伤口愈合后，需追施一次清淡的有机氮肥液以促生新芽。' , image: 'images/stages/crown_daisy_fertilize_v3.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/crown_daisy_v3_stage_1_1779655458123.png' },
      { days: 5, gdd: 75, name: '出苗期', image: 'images/crown_daisy_v3_stage_2_1779655470884.png' },
      { days: 10, gdd: 150, name: '幼苗期', image: 'images/crown_daisy_v3_stage_3_1779655483598.png' },
      { days: 20, gdd: 300, name: '生长期', image: 'images/crown_daisy_v3_stage_4_1779655500605.png' },
      { days: 30, gdd: 450, name: '旺盛生长期', image: 'images/crown_daisy_v3_stage_5_1779655513349.png' },
      { days: 40, gdd: 600, name: '初收期', image: 'images/crown_daisy_v3_stage_6_1779655525467.png' },
      { days: 50, gdd: 750, name: '采收期', image: 'images/crown_daisy_v3_stage_7_1779655541072.png' }
    ],
    pests: [
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '叶斑病',
                cause: '连作重茬、土壤贫瘠、田间湿度过大时，病菌极易随风雨传播并侵染叶片。',
                prevention: '及时清除病残体，增施磷钾肥提高植株抗性。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '地老虎 (切根虫)',
                cause: '杂草丛生、土壤潮湿的地块多发，幼虫白天潜伏土中，夜间出来切断幼苗。',
                prevention: '清晨在断苗附近挖土捕杀幼虫，利用糖醋液诱杀成虫，土壤翻耕暴晒。',
                image: 'images/pest_beet_armyworm.png'
            }
        ]
  },

  // ================= 茄果类 (Solanaceous) =================
  {
    id: 'tomato',
    avatar: 'assets/icons/icon_tomato.png',
    name: '番茄 (西红柿)',
    baseTemp: 12, categoryId: 'solanaceous',
    icon: '🍅',
    image: 'images/crop_tomato.png',
    description: '喜温性蔬菜，对光照要求高，有机种植需注意防范早疫病和晚疫病。',
    calendar: {
      north: '3-4月温室育苗，5月露地定植；秋季7月育苗。',
      south: '8-10月秋播（主力），或1-2月春播，避开6-7月高温暴雨。',
      east: '2-3月育苗，4月定植；秋季7-8月播种。',
      southwest: '2-4月春播，或8-9月秋播。',
      northwest: '4-5月播种，利用光热优势品质佳。'
    },
    stages: [
      { name: '搭架绑蔓', content: '植株长到30-40cm（出现第一花序）时，必须搭设1.5-1.8m高的单杆直立架或人字架，用柔性绑带将主干固定成“8”字形。' , image: 'images/stages/tomato_0_v3_1779513880082.png' },
      { name: '整枝打杈', content: '推荐【单干整枝】：只保留主干向上生长，所有叶腋间长出的侧枝（侧芽）在长到3-5cm时必须全部抹除（俗称打杈）。' , image: 'images/stages/tomato_1_v3_1779513894969.png' },
      { name: '疏花疏果与打底叶', content: '每穗保留4-5个好果，摘除畸形果。第一穗果转色时，将果穗下方的黄叶、老叶全部摘除，增强底部通风透光。' , image: 'images/stages/tomato_2_v3_1779513910627.png' },
      { name: '特殊追肥 🌟', content: '番茄喜钾喜钙。第一穗果膨大期开始，每半月追施一次高钾有机液肥。务必叶面喷施糖醇钙或螯合钙，以防止果实底部发黑变烂（脐腐病）。' , image: 'images/stages/tomato_3_v3_1779513921823.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/tomato_v3_stage_1_1779705453496.png' },
      { days: 7, gdd: 105, name: '出苗期', image: 'images/tomato_v3_stage_2_1779705477910.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/tomato_v3_stage_3_1779705490626.png' },
      { days: 30, gdd: 450, name: '开花期', image: 'images/tomato_v3_stage_4_1779705506448.png' },
      { days: 50, gdd: 750, name: '结果期', image: 'images/tomato_v3_stage_5_1779705522180.png' },
      { days: 70, gdd: 1050, name: '转色期', image: 'images/tomato_v3_stage_6_1779705537599.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/tomato_v3_stage_7_1779705551649.png' }
    ],
    pests: [
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '疫病',
                cause: '雨水多、湿度大、地势低洼积水的情况下最易爆发，病菌随水传播。',
                prevention: '起垄覆膜栽培，避免大水漫灌，发病初期喷施哈茨木霉菌或寡雄腐霉。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            },
            {
                name: '脐腐病 (生理缺钙)',
                cause: '主要因土壤缺钙或水分忽干忽湿，导致植株根系无法正常吸收和运输钙元素。',
                prevention: '保持水分均匀，补充骨粉或蛋壳粉等钙肥。',
                image: 'images/pest_tomato_ber.png'
            }
        ]
  },
  {
    id: 'okra',
    avatar: 'assets/icons/icon_okra.png',
    name: '秋葵 (黄秋葵)',
    baseTemp: 12, categoryId: 'solanaceous',
    icon: '🌿',
    image: 'images/crop_okra.png',
    description: '极度喜温耐热，耐旱，夏季露天的明星蔬菜，管理粗放。',
    calendar: {
      north: '晚霜后5月直播。',
      south: '3-8月均可播种。',
      east: '4-6月。',
      southwest: '4-6月。',
      northwest: '5月中下旬。'
    },
    stages: [
      { name: '整枝打叶', content: '秋葵植株极高（可达1.5-2m），极度喜光。随着果实不断向上采收，必须及时将采收节位下方的老叶、病叶全部剪除，保持田间极佳的透风透光性。' , image: 'images/stages/okra_0_v3_1779513940371.png' },
      { name: '适时采收', content: '开花后5-7天内、果荚长8-10cm时必须采收！稍微延误1-2天果荚就会迅速木质化变硬，彻底失去食用价值。' , image: 'images/stages/okra_1_v3_1779513953450.png' },
      { name: '特殊追肥 🌟', content: '植株高大需肥量大。进入开花结果盛期后，每半个月需深施一次复合有机肥或腐熟饼肥。' , image: 'images/stages/okra_2_v3_1779513981045.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/okra_v3_stage_1_1779705569315.png' },
      { days: 7, gdd: 105, name: '出苗期', image: 'images/okra_v3_stage_2_1779705582265.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/okra_v3_stage_3_1779705598566.png' },
      { days: 30, gdd: 450, name: '开花期', image: 'images/okra_v3_stage_4_1779705628923.png' },
      { days: 50, gdd: 750, name: '结果期', image: 'images/okra_v3_stage_5_1779705643996.png' },
      { days: 70, gdd: 1050, name: '成熟期', image: 'images/okra_v3_stage_6_1779705658766.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/okra_v3_stage_7_1779705673427.png' }
    ],
    pests: [
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '毒蛾 / 卷叶蛾',
                cause: '夏秋季高温干旱环境适宜其繁殖，幼虫多在夜间活动，咬食叶片并吐丝结网。',
                prevention: '人工捏死卷叶内的幼虫，喷施Bt生物农药。',
                image: 'images/pest_okra_leaffolder.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            }
        ]
  },
  {
    id: 'eggplant',
    avatar: 'assets/icons/icon_eggplant.png',
    name: '茄子',
    baseTemp: 12, categoryId: 'solanaceous',
    icon: '🍆',
    image: 'images/crop_eggplant.png',
    description: '耐热性好，生长期长，需肥量大。有机种植中需特别防范黄萎病。',
    calendar: {
      north: '晚霜后5月定植。',
      south: '春播1-2月，秋播7-8月。',
      east: '4月下旬定植。',
      southwest: '春季3-4月定植。',
      northwest: '5月定植。'
    },
    stages: [
      { name: '防倒伏支撑', content: '茄子果实较重，结果盛期极易遭遇风雨倒伏或枝条劈裂，必须在植株旁插80-100cm小竹竿，并用粗布条将主干绑缚固定。' , image: 'images/stages/eggplant_0_v3_1779513995381.png' },
      { name: '整枝打杈', content: '经典【双干整枝】：保留“门茄”（第一个茄子）下方第一强壮侧枝与主干，形成两个主枝，将其余下部所有侧枝全部抹除；中后期及时摘除底部黄叶和病叶，保持下部极度通风。' , image: 'images/stages/eggplant_1_v3_1779514009408.png' },
      { name: '特殊追肥 🌟', content: '“门茄”瞪眼期（果实开始膨大变色）重施追肥；“对茄”、“四门斗”期更是需肥极高峰期，基本每采收一次就必须追施一次速效有机肥。' , image: 'images/stages/eggplant_2_v3_1779514023156.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/eggplant_v3_stage_1_1779705685700.png' },
      { days: 7, gdd: 105, name: '出苗期', image: 'images/eggplant_v3_stage_2_1779705700567.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/eggplant_v3_stage_3_1779705715339.png' },
      { days: 30, gdd: 450, name: '开花期', image: 'images/eggplant_v3_stage_4_1779705731023.png' },
      { days: 50, gdd: 750, name: '结果期', image: 'images/eggplant_v3_stage_5_1779705745318.png' },
      { days: 70, gdd: 1050, name: '转色期', image: 'images/eggplant_v3_stage_6_1779705777204.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/eggplant_v3_stage_7_1779705792604.png' }
    ],
    pests: [
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '茶黄螨',
                cause: '温暖高湿环境下多发，虫体极小肉眼难辨，主要集中在植株幼嫩部位吸食。',
                prevention: '喷洒浏阳霉素等生物农药，剪除受害严重的顶端嫩叶销毁。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '黄萎病',
                cause: '土传真菌病害，重茬连作、土壤温度偏低且湿度大时，病菌从根部伤口侵入。',
                prevention: '实行3-5年轮作，严重时使用野生茄子砧木嫁接。',
                image: 'images/pest_eggplant_verticillium.png'
            },
            {
                name: '疫病',
                cause: '雨水多、湿度大、地势低洼积水的情况下最易爆发，病菌随水传播。',
                prevention: '起垄覆膜栽培，避免大水漫灌，发病初期喷施哈茨木霉菌或寡雄腐霉。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            }
        ]
  },
  {
    id: 'pepper',
    avatar: 'assets/icons/icon_pepper.png',
    name: '辣椒',
    baseTemp: 12, categoryId: 'solanaceous',
    icon: '🌶️',
    image: 'images/crop_pepper.png',
    description: '喜温，不耐涝。根系较浅，需保持土壤疏松湿润。',
    calendar: {
      north: '5月中旬露地定植。',
      south: '7-8月秋播，或春季。',
      east: '4月定植。',
      southwest: '2-4月播种。',
      northwest: '5月定植。'
    },
    stages: [
      { name: '防倒伏支撑', content: '辣椒枝干较脆易折断，结椒盛期头重脚轻，强烈建议搭设0.8-1m高的简易四脚防风支架，或在种植行两侧拉尼龙网绳支撑。' , image: 'images/stages/pepper_0_v3_1779514037864.png' },
      { name: '整枝打杈', content: '当“门椒”（第一个分叉处的辣椒）坐稳后，将该分叉点【以下】的所有侧芽、萌枝和老叶全部打掉，将根系养分全部集中供给上层果实。' , image: 'images/stages/pepper_1_v3_1779514051908.png' },
      { name: '特殊追肥 🌟', content: '辣椒忌干旱更忌积水。结果期对钾肥、钙肥需求巨大，追肥时除常规有机肥外，强烈建议叶面喷施螯合钙，以预防辣椒出现脐腐病（底部黑腐烂）。' , image: 'images/stages/pepper_2_v3_1779514066934.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/pepper_v3_stage_1_1779705805513.png' },
      { days: 7, gdd: 105, name: '出苗期', image: 'images/pepper_v3_stage_2_1779705824916.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/pepper_v3_stage_3_1779705838528.png' },
      { days: 30, gdd: 450, name: '开花期', image: 'images/pepper_v3_stage_4_1779705854911.png' },
      { days: 50, gdd: 750, name: '结果期', image: 'images/pepper_v3_stage_5_1779705877174.png' },
      { days: 70, gdd: 1050, name: '转色期', image: 'images/pepper_v3_stage_6_1779705890009.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/pepper_v3_stage_7_1779705905171.png' }
    ],
    pests: [
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '烟青虫',
                cause: '连作地块或邻近杂草多的田地易发，成虫在叶背产卵，幼虫蛀食果实。',
                prevention: '手工摘除被蛀食的果实，喷洒苏云金杆菌(Bt)。',
                image: 'images/pest_tomato_fruitworm.png'
            },
            {
                name: '疫病',
                cause: '雨水多、湿度大、地势低洼积水的情况下最易爆发，病菌随水传播。',
                prevention: '起垄覆膜栽培，避免大水漫灌，发病初期喷施哈茨木霉菌或寡雄腐霉。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            }
        ]
  },

  // ================= 根茎类 (Root) =================
  {
    id: 'radish',
    avatar: 'assets/icons/icon_radish.png',
    name: '萝卜',
    baseTemp: 5, categoryId: 'root',
    icon: '🥕',
    image: 'images/crop_radish.png',
    description: '半耐寒性蔬菜，直根类，要求土层深厚、疏松。',
    calendar: { north: '7-8月播种', south: '9-11月为主', east: '8-9月播种', southwest: '夏秋或秋冬', northwest: '6-7月播种' },
    stages: [
      { name: '间苗定苗', content: '萝卜苗出齐后需进行2-3次间苗，拔除弱苗和拥挤苗。进入“破肚期”（肉质根开始膨大撑破外皮）时完成最终定苗（大型品种株距定为25-30cm）。' , image: 'images/stages/radish_0_v3_1779514077917.png' },
      { name: '特殊追肥 🌟', content: '“破肚”后肉质根进入快速膨大期，重施钾肥，同时均匀浇水。生长后期若土壤极度干旱又遇大水，极易导致萝卜空心（糠心）或严重裂开。' , image: 'images/stages/radish_1_v3_1779514106918.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/radish_v3_stage_1_1779706393814.png' },
      { days: 7, gdd: 105, name: '出苗期', image: 'images/radish_v3_stage_2_1779706407294.png' },
      { days: 15, gdd: 225, name: '幼苗期', image: 'images/radish_v3_stage_3_1779706420221.png' },
      { days: 30, gdd: 450, name: '生长期', image: 'images/radish_v3_stage_4_1779706432672.png' },
      { days: 50, gdd: 750, name: '破肚期', image: 'images/radish_v3_stage_5_1779706449343.png' },
      { days: 70, gdd: 1050, name: '成熟期', image: 'images/radish_v3_stage_6_1779706465141.png' },
      { days: 90, gdd: 1350, name: '采收期', image: 'images/radish_v3_stage_7_1779706479462.png' }
    ],
    pests: [
            {
                name: '跳甲',
                cause: '干旱少雨、十字花科连作地块多发，成虫善跳跃，啃食叶片成密孔。',
                prevention: '播种前深翻土壤晾晒，幼苗期覆盖防虫网，叶面撒草木灰驱避。',
                image: 'images/pest_radish_fleabeetle.png'
            },
            {
                name: '菜青虫',
                cause: '十字花科作物连作地块多发，菜粉蝶产卵孵化，幼虫食量惊人。',
                prevention: '手工捕捉虫卵和幼虫，喷施苏云金杆菌(Bt)生物农药。',
                image: 'images/pest_cabbage_caterpillar.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '根蛆',
                cause: '施用未充分腐熟的有机肥会招来成蝇产卵，幼虫在地下啃食根茎。',
                prevention: '施用充分腐熟的有机肥，播种前土壤撒施草木灰或硅藻土。',
                image: 'images/pest_garlic_maggot.png'
            },
            {
                name: '黑腐病',
                cause: '细菌性病害，多在高温多雨季发生，主要通过雨水飞溅或昆虫从伤口侵入。',
                prevention: '避免与同科作物连作，种子温汤浸种，雨后及时排水防涝。',
                image: 'images/pest_radish_blackrot.png'
            },
            {
                name: '软腐病',
                cause: '细菌性病害，多在湿度大且植株有机械伤口或虫咬伤口时，病菌趁虚而入。',
                prevention: '防治害虫以减少伤口，高垄栽培，避免田间积水，拔除病株并在病穴撒生石灰。',
                image: 'images/pest_cabbage_softrot.png'
            },
            {
                name: '糠心 (生理性)',
                cause: '生长后期水分供应不均（如前期多水后期干旱）或采收过迟导致营养倒流。',
                prevention: '保持土壤水分均匀，避免后期干旱，适时采收。',
                image: 'images/pest_radish_blackrot.png'
            }
        ]
  },
  {
    id: 'carrot',
    avatar: 'assets/icons/icon_carrot.png',
    name: '胡萝卜',
    baseTemp: 5, categoryId: 'root',
    icon: '🥕',
    image: 'images/crop_carrot.png',
    description: '喜凉爽，耐寒。肉质根营养丰富。',
    calendar: { north: '5-6月或7月夏播', south: '8-10月秋播', east: '7-8月', southwest: '8-9月', northwest: '4-5月' },
    stages: [
      { name: '间苗除草', content: '胡萝卜幼苗期生长极其缓慢，田间杂草极易反客为主，需及时间苗（最终株距保持在10-15cm左右）并彻底人工拔除杂草。' , image: 'images/stages/carrot_0_v3_1779514122592.png' },
      { name: '特殊追肥 🌟', content: '肉质根膨大期（播后60天左右）需重施高钾液肥。此时必须严格控制水分均衡，若忽干忽湿极易导致裂根或长出畸形的“歧根”。' , image: 'images/stages/carrot_1_v3_1779514139182.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/carrot_v3_stage_1_1779706498016.png' },
      { days: 10, gdd: 150, name: '出苗期', image: 'images/carrot_v3_stage_2_1779706512570.png' },
      { days: 25, gdd: 375, name: '幼苗期', image: 'images/carrot_v3_stage_3_1779706543981.png' },
      { days: 45, gdd: 675, name: '生长期', image: 'images/carrot_v3_stage_4_1779706557811.png' },
      { days: 65, gdd: 975, name: '膨大期', image: 'images/carrot_v3_stage_5_1779706572486.png' },
      { days: 85, gdd: 1275, name: '成熟期', image: 'images/carrot_v3_stage_6_1779706588699.png' },
      { days: 100, gdd: 1500, name: '采收期', image: 'images/carrot_v3_stage_7_1779706602273.png' }
    ],
    pests: [
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '斑枯病',
                cause: '多雨季节或田间湿度过大时易发，病害通常从下部老叶开始向上蔓延。',
                prevention: '清理田间病叶，发病初期可喷洒石硫合剂或有机铜制剂。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '胡萝卜微管蚜',
                cause: '干旱少雨天气高发，多群集在伞形科植物的叶背或心叶内刺吸汁液。',
                prevention: '悬挂黄板，注意保护七星瓢虫等天敌。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '地老虎 (切根虫)',
                cause: '杂草丛生、土壤潮湿的地块多发，幼虫白天潜伏土中，夜间出来切断幼苗。',
                prevention: '清晨在断苗附近挖土捕杀幼虫，利用糖醋液诱杀成虫，土壤翻耕暴晒。',
                image: 'images/pest_beet_armyworm.png'
            }
        ]
  },
  {
    id: 'potato',
    avatar: 'assets/icons/icon_potato.png',
    name: '马铃薯 (土豆)',
    baseTemp: 5, categoryId: 'root',
    icon: '🥔',
    image: 'images/crop_potato.png',
    description: '喜冷凉，不耐高温。块茎形成需黑暗和疏松土壤。',
    calendar: { north: '4-5月一季作', south: '11月至次年1月冬作', east: '2-3月春作或8月秋作', southwest: '1-3月春作', northwest: '4-5月' },
    stages: [
      { name: '中耕培土', content: '土豆的块茎是从地下茎长出的，生长期间必须进行2次以上的深培土（总覆土厚度需超过15cm），防止薯块露出地表被阳光照射变绿结毒（龙葵素）。' , image: 'images/stages/potato_0_v3_1779514154849.png' },
      { name: '打顶与摘花', content: '发现现蕾开花时可及早摘除花蕾，切断顶端优势，防止开花消耗养分。' , image: 'images/stages/potato_1_v3_1779514168666.png' },
      { name: '特殊追肥 🌟', content: '现蕾开花期正是地下薯块极速膨大期，需重施钾肥（如优质草木灰）。同生姜一样，忌施含氯肥料。' , image: 'images/stages/potato_2_v3_1779514182001.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '播种期', image: 'images/potato_v3_stage_1_1779706615894.png' },
      { days: 15, gdd: 225, name: '出苗期', image: 'images/potato_v3_stage_2_1779706630208.png' },
      { days: 30, gdd: 450, name: '幼苗期', image: 'images/potato_v3_stage_3_1779706644009.png' },
      { days: 50, gdd: 750, name: '生长期', image: 'images/potato_v3_stage_4_1779706658922.png' },
      { days: 70, gdd: 1050, name: '结薯期', image: 'images/potato_v3_stage_5_1779706691490.png' },
      { days: 90, gdd: 1350, name: '成熟期', image: 'images/potato_v3_stage_6_1779706708840.png' },
      { days: 100, gdd: 1500, name: '采收期', image: 'images/potato_v3_stage_7_1779706725798.png' }
    ],
    pests: [
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '地老虎 (切根虫)',
                cause: '杂草丛生、土壤潮湿的地块多发，幼虫白天潜伏土中，夜间出来切断幼苗。',
                prevention: '清晨在断苗附近挖土捕杀幼虫，利用糖醋液诱杀成虫，土壤翻耕暴晒。',
                image: 'images/pest_beet_armyworm.png'
            },
            {
                name: '马铃薯甲虫',
                cause: '检疫性害虫，主要随种薯调运或气流传播，成虫和幼虫均疯狂啃食叶片。',
                prevention: '手工捕杀成虫和幼虫，种植驱避植物（如金盏花）。',
                image: 'images/pest_radish_fleabeetle.png'
            },
            {
                name: '晚疫病',
                cause: '雨水多、湿度大、地势低洼积水的情况下最易爆发，病菌随水传播。',
                prevention: '选择抗病品种，高垄培土，发病初期喷洒波尔多液。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '疮痂病',
                cause: '主要发生在微碱性、干燥的沙壤土中，未腐熟的粪肥也会增加患病率。',
                prevention: '避免施用未腐熟的碱性肥料，保持土壤微酸性。',
                image: 'images/pest_potato_scab.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            }
        ]
  },
  {
    id: 'sweetpotato',
    avatar: 'assets/icons/icon_sweetpotato.png',
    name: '红薯 (地瓜)',
    baseTemp: 5, categoryId: 'root',
    icon: '🍠',
    image: 'images/main_sweetpotato_realistic.png',
    description: '喜温耐旱，怕霜冻。适应性强。',
    calendar: { north: '5月栽秧', south: '3-8月均可', east: '5-6月', southwest: '4-6月', northwest: '5月中下旬' },
    stages: [
      { name: '打顶与提蔓 (核心技术)', content: '藤蔓长至40-50cm时掐尖打顶促发侧蔓。雨季藤蔓过长并扎出地下不定根时，需将藤蔓轻轻提起扯断不定根后放回（提蔓），【切忌翻蔓】，因为翻蔓会打乱叶片向光排列，严重减产。' , image: 'images/stages/sweetpotato_0_v3_1779513923849.png' },
      { name: '特殊追肥 🌟', content: '红薯是典型的喜钾作物。在薯块膨大期，若因干旱导致土壤垄面开裂，可直接沿裂缝灌注草木灰水或高钾液肥。' , image: 'images/stages/sweetpotato_1_v3_1779513939968.png' }
    ],
    growthSequence: [
      { days: 0, gdd: 0, name: '育苗期', image: 'images/sweetpotato_v3_stage_1_1779706740376.png' },
      { days: 15, gdd: 225, name: '缓苗期', image: 'images/sweetpotato_v3_stage_2_1779706755034.png' },
      { days: 35, gdd: 525, name: '伸蔓期', image: 'images/sweetpotato_v3_stage_3_1779706771127.png' },
      { days: 60, gdd: 900, name: '封垄期', image: 'images/sweetpotato_v3_stage_4_1779706783146.png' },
      { days: 90, gdd: 1350, name: '膨大期', image: 'images/sweetpotato_v3_stage_5_1779706796967.png' },
      { days: 120, gdd: 1800, name: '成熟期', image: 'images/sweetpotato_v3_stage_6_1779706834735.png' },
      { days: 150, gdd: 2250, name: '采收期', image: 'images/sweetpotato_v3_stage_7_1779706851167.png' }
    ],
    pests: [
            {
                name: '黑斑病',
                cause: '高温多雨或种薯带菌是主要原因，病菌可在土壤或储藏窖内存活多年。',
                prevention: '使用无病种薯，育苗前进行温汤浸种。',
                image: 'images/pest_sweetpotato_blackrot.png'
            },
            {
                name: '薯象 (甘薯小象甲)',
                cause: '干旱年份或土壤龟裂露出薯块时极易受害，成虫在薯块或藤蔓上产卵。',
                prevention: '水旱轮作，及时培土防止薯块外露，收获后清理残薯。',
                image: 'images/pest_sweetpotato_weevil.png'
            },
            {
                name: '斜纹夜蛾',
                cause: '高温干旱时多发，杂食性极强，幼虫常群集在叶背将叶肉吃光仅留叶脉。',
                prevention: '使用性诱剂诱杀雄蛾，或喷施苏云金杆菌(Bt)。',
                image: 'images/pest_beet_armyworm.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            }
        ]
  },
  {
    id: 'ginger',
    avatar: 'assets/icons/icon_ginger.png',
    name: '生姜',
    baseTemp: 5, categoryId: 'root',
    icon: '🫚',
    image: 'images/crop_ginger.png',
    description: '喜温暖湿润，喜阴，极不耐寒也不耐强光直射。',
    calendar: {
      north: '晚霜后5月催芽播种。',
      south: '3-4月播种。',
      east: '4-5月。',
      southwest: '3-5月。',
      northwest: '一般需保护地，露天慎种。'
    },
    stages: [
      { name: '遮阴管理', content: '生姜喜阴怕强光直射，幼苗期必须搭设透光率50%的遮阳网，或与高秆作物（如玉米）套种遮阴。' , image: 'images/stages/ginger_0_v3_1779513955176.png' },
      { name: '培土 (核心技术)', content: '俗语“姜不培土不长”，生长期间需结合除草进行2-3次高培土，将根际垒高，遮光避日，促使地下姜块向上垂直生长并防止其露出地表变绿发苦。' , image: 'images/stages/ginger_1_v3_1779513970011.png' },
      { name: '特殊追肥 🌟', content: '立秋前后进入姜块“暴长”阶段，此时必须重施“秋里肥”（大量腐熟饼肥和硫酸钾）。生姜极度忌氯，绝对不能施用氯化钾。' , image: 'images/stages/ginger_2_v3_1779513985871.png' }
    ],
    pests: [
            {
                name: '姜瘟病',
                cause: '主要由带菌姜种和带菌土壤传播，高温多雨及大水漫灌极易导致全田毁灭。',
                prevention: '严格挑选无病姜种，发现病株连同周围土壤一起挖除并撒生石灰消毒。',
                image: 'images/pest_ginger_wilt.png'
            },
            {
                name: '姜螟 (玉米螟)',
                cause: '前茬玉米田或杂草多的地块易发，幼虫钻蛀茎部导致植株上部枯黄折断。',
                prevention: '在幼虫钻蛀前喷洒Bt生物农药，人工剥除带虫苞叶。',
                image: 'images/pest_ginger_borer.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '斑点病',
                cause: '连阴雨天气或大水漫灌后，田间湿度居高不下时容易引发该真菌病害。',
                prevention: '雨季注意排水防涝，增施有机肥增强抗病力。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '地老虎 (切根虫)',
                cause: '杂草丛生、土壤潮湿的地块多发，幼虫白天潜伏土中，夜间出来切断幼苗。',
                prevention: '清晨在断苗附近挖土捕杀幼虫，利用糖醋液诱杀成虫，土壤翻耕暴晒。',
                image: 'images/pest_beet_armyworm.png'
            }
        ]
  },
  {
    id: 'onion',
    avatar: 'assets/icons/icon_onion.png',
    name: '洋葱',
    baseTemp: 5, categoryId: 'root',
    icon: '🧅',
    image: 'images/crop_onion.png',
    description: '二年生长日照植物，耐寒。形成鳞茎需长日照和较高温度。',
    calendar: {
      north: '秋季9月播种育苗，次年春季定植；或早春直播。',
      south: '9-10月秋播育苗，11-12月定植，次年5月收获。',
      east: '9月中下旬播种育苗，11月定植。',
      southwest: '秋播为主。',
      northwest: '春季播种，秋季收获（长日照品种）。'
    },
    stages: [
      { name: '水分管理', content: '苗期忌水大防徒长。鳞茎膨大期需水最多，必须保持湿润。但在采收前7-10天必须彻底停止浇水，以利于鳞茎收口和长期耐储藏。' , image: 'images/stages/onion_0_v3_1779514000576.png' },
      { name: '特殊追肥 🌟', content: '春季返青后追施提苗肥。当鳞茎开始膨大（长至3cm）时，重施高钾膨大肥，切忌此时偏施氮肥，否则会导致“贪青徒长”且不长葱头。' , image: 'images/stages/onion_1_v3_1779514015063.png' }
    ],
    pests: [
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            },
            {
                name: '紫斑病',
                cause: '温暖高湿天气易发，尤其是在葱蒜类作物生长衰弱或有蓟马危害造成伤口时。',
                prevention: '增施有机肥，雨后及时排水，喷洒枯草芽孢杆菌。',
                image: 'images/pest_garlic_purpleblotch.png'
            },
            {
                name: '葱蛆',
                cause: '暂无详细原因，建议保持通风透光，合理轮作。',
                prevention: '施用充分腐熟的有机肥，播种前土壤撒草木灰。',
                image: 'images/pest_garlic_maggot.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '收获前控制浇水，保持田间干燥，收获后充分晾晒。',
                image: 'images/pest_tomato_botrytis.png'
            }
        ]
  },
  {
    id: 'yam',
    avatar: 'assets/icons/icon_yam.png',
    name: '山药 (淮山)',
    baseTemp: 5, categoryId: 'root',
    icon: '🥔',
    image: 'images/crop_yam.png',
    description: '深根作物，需极深且疏松的土层。耐旱怕涝。',
    calendar: {
      north: '4月中下旬播种。',
      south: '2-4月播种。',
      east: '3-4月。',
      southwest: '3-4月。',
      northwest: '4月下旬。'
    },
    stages: [
      { name: '定植与搭架', content: '山药藤蔓极长且细弱，出苗后需迅速搭设1.5-2m高的结实人字架或拉网架供其攀爬，否则藤蔓缠绕在地极易感染病害。' , image: 'images/stages/yam_0_v3_1779514027628.png' },
      { name: '培土与排涝', content: '地下块茎极度怕水涝，田间必须开挖深排水沟。' , image: 'images/stages/yam_1_v3_1779514040954.png' },
      { name: '特殊追肥 🌟', content: '生长期长达数月，后期需肥量极大。当藤蔓长满架时，重施一次含硫酸钾的有机肥以促进地下块茎快速膨大变粗。' , image: 'images/stages/yam_2_v3_1779514055516.png' }
    ],
    pests: [
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            },
            {
                name: '叶蜂',
                cause: '早春或初夏温暖时多发，成虫在幼嫩组织产卵，幼虫群集啃食叶片边缘。',
                prevention: '人工捕杀幼虫，幼虫期喷施苦参碱。',
                image: 'images/pest_tomato_fruitworm.png'
            },
            {
                name: '褐斑病',
                cause: '高温高湿、多雨季节易发，氮肥偏多导致植株徒长、通风透光不良时病情加重。',
                prevention: '搭架栽培改善通风透光，发病初期摘除病叶。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '蛴螬 (地下害虫)',
                cause: '施用未经充分腐熟的有机肥（如生牛粪）最易招惹金龟子产卵孵化出蛴螬。',
                prevention: '施用充分腐熟的有机肥，播种前翻耕暴晒土壤。',
                image: 'images/pest_beet_armyworm.png'
            }
        ]
  },

  // ================= 瓜菜类 (Cucurbits) =================
  {
    id: 'cucumber',
    avatar: 'assets/icons/icon_cucumber.png',
    name: '黄瓜',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🥒',
    image: 'images/crop_cucumber.png',
    description: '喜温喜湿，不耐寒。结果期长。',
    calendar: { north: '4-5月露地直播', south: '2-8月均可', east: '3-4月，7-8月', southwest: '3-4月', northwest: '5月上旬' },
    stages: [
      { name: '搭架引蔓', content: '长至5-6片叶时（开始吐须），搭设2m高的人字架。采用“S”型绑蔓法，使茎秆均匀分布，避免互相遮挡。' , image: 'images/stages/cucumber_0_v3_1779514083219.png' },
      { name: '整蔓打枝', content: '主干结瓜为主。抹除主蔓5节以下的所有侧枝和雌花（避免拖地和争夺养分）；5节以上的侧枝可留1瓜1叶后摘心。当主蔓长满架顶时，进行掐尖打顶。' , image: 'images/stages/cucumber_1_v3_1779514097201.png' },
      { name: '特殊追肥 🌟', content: '黄瓜根系浅且需肥量极大，原则是“少吃多餐”。结瓜盛期每隔7-10天追施一次腐熟有机液肥，重点补充钾肥和微量元素。' , image: 'images/stages/cucumber_2_v3_1779514111532.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/cucumber_v3_stage_1_1779707113594.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/cucumber_v3_stage_2_1779707126513.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/cucumber_v3_stage_3_1779707142900.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/cucumber_v3_stage_4_1779707157524.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/cucumber_v3_stage_5_1779707172655.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/cucumber_v3_stage_6_1779707187264.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/cucumber_v3_stage_7_1779707200995.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '角斑病',
                cause: '细菌性病害，多在低温高湿、结露时间长的环境下发病，通过风雨传播。',
                prevention: '细菌性病害，需避免叶片长时间结露，控制氮肥施用量。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '枯萎病',
                cause: '典型土传病害，重茬连作、土壤积水、根系受伤都会诱发此病。',
                prevention: '实行3-5年轮作，使用嫁接苗（如南瓜根接西瓜），避免偏施氮肥。',
                image: 'images/pest_watermelon_fusarium.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            }
        ]
  },
  {
    id: 'pumpkin',
    avatar: 'assets/icons/icon_pumpkin.png',
    name: '南瓜 (老南瓜/金瓜)',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🎃',
    image: 'images/crop_pumpkin.png',
    description: '适应性极强，耐旱耐瘠薄，藤蔓生长旺盛。',
    calendar: { north: '4-5月', south: '2-4月或7-8月', east: '3-4月', southwest: '3-5月', northwest: '4-5月' },
    stages: [
      { name: '种植方式', content: '通常以地爬为主（藤蔓极长，行距需2-3米）；若庭院空间有限，可搭设非常牢固的平棚架（高2m，顶拉粗铁丝）。' , image: 'images/stages/pumpkin_0_v3_1779514127694.png' },
      { name: '整蔓压蔓', content: '【地爬压蔓】：采用双蔓或三蔓整枝。当藤蔓长至50cm左右时，在节位上培土压住藤蔓，促生不定根吸收养分，并固定防风翻蔓。' , image: 'images/stages/pumpkin_1_v3_1779514140869.png' },
      { name: '人工授粉', content: '南瓜雄花雌花常不同步开，且夏秋昆虫少，早晨6-8点人工授粉可大幅提高坐果率。' , image: 'images/stages/pumpkin_2_v3_1779514154725.png' },
      { name: '特殊追肥 🌟', content: '前期严格控肥控水防徒长（只长藤不结瓜）；当第一个瓜坐稳并长至网球大小时，在距根部30cm处开深沟，重施一次腐熟膨瓜有机肥。' , image: 'images/stages/pumpkin_3_v3_1779514170519.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/pumpkin_v3_stage_1_1779707215394.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/pumpkin_v3_stage_2_1779707232265.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/pumpkin_v3_stage_3_1779708662984.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/pumpkin_v3_stage_4_1779708678634.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/pumpkin_v3_stage_5_1779708694512.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/pumpkin_v3_stage_6_1779708708298.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/pumpkin_v3_stage_7_1779708720195.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '斑潜蝇',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '瓜实蝇',
                cause: '高温闷热环境活跃，成虫以产卵器刺入幼果内产卵，幼虫在果实内蛀食发酵。',
                prevention: '幼果期套袋保护，悬挂引诱剂或糖醋液诱杀成虫。',
                image: 'images/pest_melon_fly.png'
            }
        ]
  },
  {
    id: 'zucchini',
    avatar: 'assets/icons/icon_zucchini.png',
    name: '西葫芦',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🥒',
    image: 'images/crop_zucchini.png',
    description: '矮生半蔓性，生长快，结果多。',
    calendar: { north: '4-5月春播', south: '9月至次年2月', east: '3-4月或8-9月', southwest: '春秋两季', northwest: '5月' },
    stages: [
      { name: '整枝打叶', content: '西葫芦一般不搭架，呈丛生状。生长中后期，极易因密闭导致化瓜或白粉病，需及时用剪刀贴秆剪除下部触地的老叶、病叶和不结果的盲枝。' , image: 'images/stages/zucchini_0_v3_1779514185320.png' },
      { name: '人工授粉', content: '早春或高密度种植时昆虫少，必须在早晨8-10点采摘雄花，剥去花瓣后将花粉轻轻涂抹在雌花柱头上。' , image: 'images/stages/zucchini_1_v3_1779514204593.png' },
      { name: '特殊追肥 🌟', content: '根瓜（第一个瓜）坐住后开始追肥。结果盛期采摘频繁，每采收1-2次就需要追施一次速效有机肥。' , image: 'images/stages/zucchini_2_v3_1779514220389.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/zucchini_v3_stage_1_1779708733871.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/zucchini_v3_stage_2_1779708748752.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/zucchini_v3_stage_3_1779708763405.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/zucchini_v3_stage_4_1779708781897.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/zucchini_v3_stage_5_1779708819694.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/zucchini_v3_stage_6_1779708834395.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/zucchini_v3_stage_7_1779708847887.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '病毒病',
                cause: '主要由蚜虫、白粉虱等刺吸式害虫传播，高温干旱时蚜虫活跃而多发。',
                prevention: '彻底消灭传播媒介（如蚜虫、白粉虱），发现花叶皱缩的病株立刻拔除销毁。',
                image: 'images/pest_tomato_virus.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            }
        ]
  },
  {
    id: 'bittermelon',
    name: '苦瓜',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🥒',
    avatar: 'assets/icons/icon_bittermelon.png',
    image: 'images/crop_bittermelon.png',
    description: '喜温耐热，有机种植虫害少。',
    calendar: { north: '晚霜后定植', south: '2-8月', east: '3-4月', southwest: '3-5月', northwest: '5月' },
    stages: [
      { name: '搭架引蔓', content: '藤蔓极度繁茂，必须搭架！推荐搭设2-2.5m高的平棚架或人字架，人工辅助引主蔓上架。' , image: 'images/stages/bittermelon_0_v3_1779514234598.png' },
      { name: '整枝打杈', content: '主蔓上架前，【摘除1米以下的所有侧枝】，保持底部高度通风。上架后任其侧蔓生长，但需定期剪除细弱枝、重叠的无果侧蔓和发黄老叶。' , image: 'images/stages/bittermelon_1_v3_1779514246485.png' },
      { name: '特殊追肥 🌟', content: '苦瓜结瓜期长达数月。从第一批瓜收获起，每半个月左右追施一次腐熟饼肥水或三元复合有机肥，确保持续不断的高产。' , image: 'images/stages/bittermelon_2_v3_1779514261187.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/bittermelon_v3_stage_1_1779708860950.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/bittermelon_v3_stage_2_1779708874089.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/bittermelon_v3_stage_3_1779708887824.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/bittermelon_v3_stage_4_1779708906072.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/bittermelon_v3_stage_5_1779708922373.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/bittermelon_v3_stage_6_1779708940274.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/bittermelon_v3_stage_7_1779708956561.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '瓜实蝇 (针蜂)',
                cause: '高温闷热环境活跃，成虫以产卵器刺入幼果内产卵，幼虫在果实内蛀食发酵。',
                prevention: '果实套袋保护，悬挂专用诱捕器或黄板。',
                image: 'images/pest_melon_fly.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '根结线虫',
                cause: '连作重茬地、沙壤土高发，通过土壤和灌溉水传播，寄生在根部。',
                prevention: '与万寿菊混种，高温闷棚消毒土壤，增施含有哈茨木霉菌的有机肥。',
                image: 'images/pest_tomato_nematode.png'
            }
        ]
  },
  {
    id: 'winter_melon',
    avatar: 'assets/icons/icon_winter_melon.png',
    name: '冬瓜',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🍉',
    image: 'images/crop_winter_melon.png',
    description: '喜温耐热，果实极大，需肥水量大，耐储藏。',
    calendar: {
      north: '4-5月播种。',
      south: '2-3月春播，7月秋播。',
      east: '3-4月播种。',
      southwest: '3-5月。',
      northwest: '5月。'
    },
    stages: [
      { name: '搭架与地爬', content: '大冬瓜品种（如粉皮冬瓜）多地爬（需在瓜下垫草或泡沫板防烂瓜）；小冬瓜（串收冬瓜）强烈建议搭设坚固的平棚架（高2m）吊瓜种植，通风透光极佳。' , image: 'images/stages/winter_melon_0_v3_1779513872052.png' },
      { name: '整枝压蔓', content: '采用【单干整枝】，摘除所有侧蔓，集中营养长一个巨型瓜。地爬种植需在15-20节位进行泥土压蔓。通常在主蔓第20-25节（第三雌花左右）留瓜最优。' , image: 'images/stages/winter_melon_1_v3_1779513888290.png' },
      { name: '特殊追肥 🌟', content: '施肥口诀：“两头轻、中间重”。定植缓苗后轻施提苗肥，果实长到1-2斤开始急速膨大时，重施膨瓜肥（有机水肥灌根，配合高钾）。' , image: 'images/stages/winter_melon_2_v3_1779513902911.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/winter_melon_v3_stage_1_1779709136816.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/winter_melon_v3_stage_2_1779709150757.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/winter_melon_v3_stage_3_1779709165281.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/winter_melon_v3_stage_4_1779709179777.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/winter_melon_v3_stage_5_1779709193266.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/winter_melon_v3_stage_6_1779709207513.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/winter_melon_v3_stage_7_1779709220552.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '蔓枯病',
                cause: '田间湿度过大、种植过密、通风透光差，或偏施氮肥导致植株徒长时易发。',
                prevention: '保持田间干燥，避免大水漫灌，发现病斑用生石灰涂抹。',
                image: 'images/pest_wintermelon_blight.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '瓜螟',
                cause: '夏秋高温多雨季高发，幼虫在瓜叶背面吐丝卷叶，或钻入幼瓜内蛀食。',
                prevention: '秋季清理田园，开花结瓜期喷施Bt生物制剂。',
                image: 'images/pest_tomato_fruitworm.png'
            }
        ]
  },
  {
    id: 'luffa',
    avatar: 'assets/icons/icon_luffa.png',
    name: '丝瓜',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🥒',
    image: 'images/crop_luffa.png',
    description: '耐热耐湿，夏季绿棚好帮手，生长势极旺。',
    calendar: {
      north: '5月露天播种。',
      south: '2-8月均可。',
      east: '3-5月。',
      southwest: '3-5月。',
      northwest: '5月。'
    },
    stages: [
      { name: '搭架引蔓', content: '丝瓜攀爬能力极强，需搭设高2m以上的平棚架（棚顶最好拉尼龙网）。蔓长30cm时开始绑蔓上架。' , image: 'images/stages/luffa_0_v3_1779513916193.png' },
      { name: '整枝与理瓜', content: '上架前摘除所有侧蔓和雌花；上架后主副蔓均可结瓜，任其生长。发现幼瓜被藤蔓卡住、卷曲或搁置在架顶时，需人工“理瓜”将瓜条顺直垂下，底部可绑小石块拉直。' , image: 'images/stages/luffa_1_v3_1779513930526.png' },
      { name: '特殊追肥 🌟', content: '丝瓜极度喜水喜肥，“水瓜”之名由此而来。结果期必须保持土壤始终湿润，每隔10天必须追施一次腐熟的农家液肥。' , image: 'images/stages/luffa_2_v3_1779513945812.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/luffa_v3_stage_1_1779709267005.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/luffa_v3_stage_2_1779709281391.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/luffa_v3_stage_3_1779709294412.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/luffa_v3_stage_4_1779709309284.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/luffa_v3_stage_5_1779709323570.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/luffa_v3_stage_6_1779709337906.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/luffa_v3_stage_7_1779709353231.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            },
            {
                name: '瓜实蝇',
                cause: '高温闷热环境活跃，成虫以产卵器刺入幼果内产卵，幼虫在果实内蛀食发酵。',
                prevention: '果实长出后及早套袋，清理田间落果。',
                image: 'images/pest_melon_fly.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            }
        ]
  },
  {
    id: 'calabash',
    avatar: 'assets/icons/icon_calabash.png',
    name: '葫芦/瓠子',
    baseTemp: 12, categoryId: 'cucurbits',
    icon: '🍐',
    image: 'images/crop_calabash.png',
    description: '喜温喜光，生长势强，夜间开花结瓜。',
    calendar: {
      north: '5月露天。',
      south: '3-8月。',
      east: '4-6月。',
      southwest: '4-6月。',
      northwest: '5月。'
    },
    stages: [
      { name: '搭架种植', content: '搭设2米左右高平棚架，架子必须非常牢固以承受挂果重量。' , image: 'images/stages/calabash_0_v3_1779513961478.png' },
      { name: '整蔓打顶 (核心技术)', content: '主蔓结瓜少，必须通过打顶促发侧枝。主蔓长至5-6片叶时进行“摘心”（掐断主蔓头），促发2条强壮的子蔓上架；子蔓长出数叶后再次摘心促发孙蔓，孙蔓结瓜最多且早。' , image: 'images/stages/calabash_1_v3_1779513975421.png' },
      { name: '特殊追肥 🌟', content: '定植缓苗后追一次提苗肥。当幼瓜坐稳并开始下垂膨大时，连续追施2-3次高钾有机肥，切忌前期氮肥过多引起徒长。' , image: 'images/stages/calabash_2_v3_1779513989834.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/calabash_v3_stage_1_1779709543250.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/calabash_v3_stage_2_1779709559878.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/calabash_v3_stage_3_1779709576783.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/calabash_v3_stage_4_1779709590404.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/calabash_v3_stage_5_1779709605073.png', days: 15, gdd: 225  },
      { name: '结瓜', image: 'images/calabash_v3_stage_6_1779709619259.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/calabash_v3_stage_7_1779709633898.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '白粉病',
                cause: '偏施氮肥、光照不足且通风不良的密植环境下，孢子极易随气流传播。',
                prevention: '保持通风透光，发病初期叶面喷洒小苏打水或稀释牛奶溶液可有效抑制。',
                image: 'images/pest_melon_powdery_mildew.png'
            },
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '瓜螟',
                cause: '夏秋高温多雨季高发，幼虫在瓜叶背面吐丝卷叶，或钻入幼瓜内蛀食。',
                prevention: '在幼虫卷叶前人工捏杀，喷施生物制剂Bt。',
                image: 'images/pest_tomato_fruitworm.png'
            },
            {
                name: '白粉虱',
                cause: '喜温暖环境，大棚或温室极易爆发，寄主广泛，群集叶背吸食。',
                prevention: '悬挂黄板诱杀，释放丽蚜小蜂等天敌，傍晚喷施苦参碱。',
                image: 'images/pest_tomato_whitefly.png'
            }
        ]
  },

  // ================= 豆类 (Legumes) =================
  {
    id: 'cowpea',
    avatar: 'assets/icons/icon_cowpea.png',
    name: '豇豆 (长豆角)',
    baseTemp: 12, categoryId: 'legumes',
    icon: '🫘',
    image: 'images/crop_cowpea.png',
    description: '喜温耐热，根系有根瘤菌能固氮，对氮肥需求少。',
    calendar: { north: '5-6月', south: '3-8月', east: '4-7月', southwest: '3-5月', northwest: '5月中下旬' },
    stages: [
      { name: '搭架引蔓', content: '蔓生长至30-40cm开始抽薹时，及时搭设2-2.5m高的人字架。需人工辅助将藤蔓【逆时针方向】缠绕上架（顺时针容易松脱）。' , image: 'images/stages/cowpea_0_v3_1779514004961.png' },
      { name: '整枝打杈', content: '抹底芽：主蔓第一花序（约40cm以下）的侧芽必须全部抹除；打旁心：第一花序以上的侧枝结荚后，留1-2叶摘心；当主蔓长满架顶时及时打顶，促使中下部结荚。' , image: 'images/stages/cowpea_1_v3_1779514020733.png' },
      { name: '特殊追肥 🌟', content: '施肥口诀：“控苗促荚”。开花前严格控水控肥防徒长（只长藤不结豆）；当第一批豆荚长至3-4cm时开始重施追肥，多施磷钾肥，防止落花落荚。' , image: 'images/stages/cowpea_2_v3_1779514037417.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/cowpea_v3_stage_1_1779709990943.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/cowpea_v3_stage_2_1779710004356.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/cowpea_v3_stage_3_1779710021642.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/cowpea_v3_stage_4_1779710039132.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/cowpea_v3_stage_5_1779710053877.png', days: 15, gdd: 225  },
      { name: '结荚', image: 'images/cowpea_v3_stage_6_1779710067725.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/cowpea_v3_stage_7_1779710084293.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '锈病',
                cause: '温暖、高湿、多雾多露的天气极易诱发，孢子可随风长距离传播。',
                prevention: '收获后彻底清理田园，喷洒三唑酮类生物替代制剂（如枯草芽孢杆菌）。',
                image: 'images/pest_bean_rust.png'
            },
            {
                name: '煤霉病',
                cause: '大棚内高温高湿、种植过密、通风不良时发病严重，影响叶片光合作用。',
                prevention: '搭架要高，保持通风透光，避免种植过密。',
                image: 'images/pest_cowpea_leafmold.png'
            },
            {
                name: '豆荚螟',
                cause: '干旱少雨天气多发，成虫在花蕾和嫩荚上产卵，幼虫孵化后即蛀入其内。',
                prevention: '在花期喷洒Bt或核型多角体病毒，及时摘除虫荚。',
                image: 'images/pest_cowpea_borer.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            }
        ]
  },
  {
    id: 'green_bean',
    avatar: 'assets/icons/icon_green_bean.png',
    name: '四季豆 (菜豆/扁豆)',
    baseTemp: 12, categoryId: 'legumes',
    icon: '🫛',
    image: 'images/crop_green_bean.png',
    description: '喜温暖，不耐酷热和霜冻。对光照要求中等。',
    calendar: {
      north: '5月春播，或7-8月秋播。',
      south: '2-4月春播，8-10月秋播（避开盛夏酷暑）。',
      east: '4-5月春播，8月秋播。',
      southwest: '春秋两季。',
      northwest: '5月播种。'
    },
    stages: [
      { name: '定植与搭架', content: '分为蔓生种和矮生种。蔓生种需搭设2m高人字架引蔓；矮生种呈灌木状，无需搭架，非常适合阳台盆栽或露地密植。' , image: 'images/stages/green_bean_0_v3_1779514051045.png' },
      { name: '整枝打顶', content: '蔓生四季豆长满支架（约2米）时进行打顶摘心，抑制顶端优势，促使中下部侧枝萌发和豆荚迅速膨大。' , image: 'images/stages/green_bean_1_v3_1779514066099.png' },
      { name: '特殊追肥 🌟', content: '初花期“见花浇水”，严禁在花未开齐前大水漫灌（极易引起落花）；荚长3-4厘米时进入需肥水高峰期，结合浇水追施腐熟的磷钾肥液。' , image: 'images/stages/green_bean_2_v3_1779514078677.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/green_bean_v3_stage_1_1779710114076.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/green_bean_v3_stage_2_1779710127617.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/green_bean_v3_stage_3_1779710141411.png', days: 20, gdd: 300  },
      { name: '抽蔓', image: 'images/green_bean_v3_stage_4_1779710154094.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/green_bean_v3_stage_5_1779710169318.png', days: 15, gdd: 225  },
      { name: '结荚', image: 'images/green_bean_v3_stage_6_1779710184514.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/green_bean_v3_stage_7_1779710199289.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '炭疽病',
                cause: '高温、高湿、多雨季节易发，氮肥过多或连作也会加重病情。',
                prevention: '避免雨水直淋，施用充分腐熟有机肥，发现病叶及时摘除并带离菜园。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '根腐病',
                cause: '土壤黏重、排水不良、长期连作或土温偏低时，真菌从根部侵入导致腐烂。',
                prevention: '避免连作，高垄栽培，播种前用木霉菌拌种。',
                image: 'images/pest_cabbage_softrot.png'
            },
            {
                name: '锈病',
                cause: '温暖、高湿、多雾多露的天气极易诱发，孢子可随风长距离传播。',
                prevention: '雨季注意排水，喷洒波尔多液防护。',
                image: 'images/pest_bean_rust.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '斑潜蝇',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '挂黄板诱杀成虫，摘除带虫道的叶片。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '红蜘蛛',
                cause: '主要在高温、干燥及通风不良的环境下滋生，随风或爬行传播。',
                prevention: '保持田间湿度（不喜欢潮湿），释放捕食螨，喷洒矿物油或浏阳霉素。',
                image: 'images/pest_spider_mite.png'
            }
        ]
  },
  {
    id: 'broad_bean',
    avatar: 'assets/icons/icon_broad_bean.png',
    name: '蚕豆',
    baseTemp: 12, categoryId: 'legumes',
    icon: '🫘',
    image: 'images/crop_broad_bean.png',
    description: '极耐寒，不耐热。长日照植物，冬季闲田极佳的绿肥与经济作物。',
    calendar: {
      north: '3-4月早春播种（春蚕豆）。',
      south: '10-11月秋播越冬（秋蚕豆）。',
      east: '10-11月秋播。',
      southwest: '10月秋播。',
      northwest: '3-4月春播。'
    },
    stages: [
      { name: '整地播种', content: '耐寒不耐热，常作为越冬作物秋播（南方）或早春播种（北方）。每穴播种2-3粒。' , image: 'images/stages/broad_bean_0_v3_1779514092160.png' },
      { name: '整枝打顶', content: '无需独立搭架，但可拉尼龙绳围圈防倒伏。生育中期拔除植株底部不开花结荚的“无效分蘖”；当进入盛花结荚期，及时摘除植株顶端嫩尖（打顶），促使养分回流向豆荚。' , image: 'images/stages/broad_bean_1_v3_1779514111060.png' },
      { name: '特殊追肥 🌟', content: '蚕豆根部具有根瘤菌，有较强的自主固氮作用，故应【少施氮肥，多施磷钾肥】。开花初荚期追施一次草木灰或过磷酸钙。' , image: 'images/stages/broad_bean_2_v3_1779514126248.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/broad_bean_v3_stage_1_1779710227938.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/broad_bean_v3_stage_2_1779710241993.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/broad_bean_v3_stage_3_1779710257413.png', days: 20, gdd: 300  },
      { name: '分枝', image: 'images/broad_bean_v3_stage_4_1779710270707.png', days: 20, gdd: 300  },
      { name: '开花', image: 'images/broad_bean_v3_stage_5_1779710289138.png', days: 15, gdd: 225  },
      { name: '结荚', image: 'images/broad_bean_v3_stage_6_1779710304316.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/broad_bean_v3_stage_7_1779710318701.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '赤斑病 (巧克力斑病)',
                cause: '暂无详细原因，建议保持通风透光，合理轮作。',
                prevention: '合理密植，增施磷钾肥，雨后及时排水防涝。',
                image: 'images/pest_broadbean_chocolate.png'
            },
            {
                name: '锈病',
                cause: '温暖、高湿、多雾多露的天气极易诱发，孢子可随风长距离传播。',
                prevention: '发病初期喷石硫合剂或有机铜制剂。',
                image: 'images/pest_bean_rust.png'
            },
            {
                name: '蚜虫',
                cause: '常在温暖干旱或氮肥过量的环境下爆发，通过口器刺吸汁液，繁殖极快。',
                prevention: '悬挂黄板，种植孔雀草或大蒜驱避，喷洒自制大蒜辣椒水或印楝素。',
                image: 'images/pest_tomato_aphid.png'
            },
            {
                name: '斑潜蝇 (鬼画符)',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '悬挂黄板诱杀成虫，及时摘除有虫道的叶片销毁，用防虫网隔离。',
                image: 'images/pest_tomato_leafminer.png'
            },
            {
                name: '根腐病',
                cause: '土壤黏重、排水不良、长期连作或土温偏低时，真菌从根部侵入导致腐烂。',
                prevention: '避免黏重土壤积水，采用高垄种植。',
                image: 'images/pest_cabbage_softrot.png'
            }
        ]
  },

  // ================= 葱蒜类 (Allium) =================
  {
    id: 'garlic',
    avatar: 'assets/icons/icon_garlic.png',
    name: '大蒜',
    baseTemp: 5, categoryId: 'allium',
    icon: '🧄',
    image: 'images/crop_garlic.png',
    description: '耐寒，具有强烈杀菌作用，有机农场不可缺少的伴生植物。',
    calendar: { north: '3月春播或8-9月秋播', south: '9-11月秋播', east: '9-10月秋播', southwest: '9-10月秋播', northwest: '3-4月春播' },
    stages: [
      {
        name: '幼苗越冬期',
        water_fertilizer: '出苗期保持湿润，北方地区越冬前需浇透“越冬水”以防冻伤。',
        pest_management: '预防根蛆。',
        pruning_trellising: '播种时深度适中，覆土并可覆盖稻草保温保墒。',
        image: null
      },
      {
        name: '退母期与蒜薹生长期',
        water_fertilizer: '“退母期”（母瓣干瘪，幼苗靠自身根系吸肥的转折点）容易出现叶尖发黄，需马上追施促苗肥。春季蒜薹生长期需水量最大，需保持充足水分。',
        water_image: 'images/stages/garlic_water_fertilize_v3.png',
        pest_management: '防范紫斑病、灰霉病及葱蓟马。',
        pruning_trellising: '及时抽出蒜薹以利于地下蒜头膨大。',
        pruning_image: 'images/stages/garlic_harvest_scape_v3.png'
      },
      {
        name: '蒜头膨大期',
        water_fertilizer: '抽薹后进入蒜头膨大期，需重施高钾肥。采收前7-10天停止浇水，以利于储藏。',
        pest_management: '雨后及时排水，避免湿度过高引发叶枯病和根腐病。',
        pruning_trellising: null
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/garlic_v3_stage_1_1779711272689.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/garlic_v3_stage_2_1779711289560.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/garlic_v3_stage_3_1779711304533.png', days: 20, gdd: 300  },
      { name: '营养生长', image: 'images/garlic_v3_stage_4_1779711319322.png', days: 30, gdd: 450  },
      { name: '抽薹', image: 'images/garlic_v3_stage_5_1779711337521.png', days: 15, gdd: 225  },
      { name: '膨大', image: 'images/garlic_v3_stage_6_1779711352709.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/garlic_v3_stage_7_1779711365719.png', days: 10, gdd: 150  }
    ],
    pests: [
            {
                name: '蒜蛆 (根蛆)',
                cause: '施用未充分腐熟的有机肥会招来成蝇产卵，幼虫在地下啃食根茎。',
                prevention: '施用充分腐熟的有机肥，播种前土壤撒草木灰或硅藻土。',
                image: 'images/pest_garlic_maggot.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            },
            {
                name: '紫斑病',
                cause: '温暖高湿天气易发，尤其是在葱蒜类作物生长衰弱或有蓟马危害造成伤口时。',
                prevention: '实行轮作，增施有机肥，喷洒枯草芽孢杆菌。',
                image: 'images/pest_garlic_purpleblotch.png'
            },
            {
                name: '叶枯病',
                cause: '连作地块、偏施氮肥导致植株抗性下降时，遇连阴雨天气极易发病蔓延。',
                prevention: '雨后及时排水，避免湿度过高。',
                image: 'images/pest_tomato_blight.png'
            },
            {
                name: '灰霉病',
                cause: '低温、高湿且连阴雨天气高发，尤其是密闭的大棚或伤口多的植株。',
                prevention: '降低棚内或田间湿度，及时摘除老叶病叶，使用哈茨木霉菌或枯草芽孢杆菌。',
                image: 'images/pest_tomato_botrytis.png'
            }
        ]
  },
  {
    id: 'greenonion',
    avatar: 'assets/icons/icon_greenonion.png',
    name: '大葱/小葱',
    baseTemp: 5, categoryId: 'allium',
    icon: '🧅',
    image: 'images/crop_greenonion.png',
    description: '适应性强，大葱需培土软化，小葱生长快速。',
    calendar: { north: '秋播育苗次年夏定植', south: '四季均可', east: '春秋均可', southwest: '四季', northwest: '春季' },
    stages: [
      {
        name: '幼苗期',
        water_fertilizer: '苗床保持湿润。定植前控制浇水进行炼苗。',
        pest_management: '注意防治地老虎等地下害虫。',
        pruning_trellising: '选择排水良好的地块，深翻整地。',
        image: null
      },
      {
        name: '葱白生长期',
        water_fertilizer: '立秋后天气转凉，大葱进入葱白极速生长期，需大量养分，必须重施“攻葱肥”（高氮高钾），并结合培土和浇透水。',
        water_image: 'images/stages/greenonion_fertilize_v3.png',
        pest_management: '防范葱蓟马、斑潜蝇（鬼画符）和紫斑病。',
        pruning_trellising: '大葱优质葱白长的秘诀在于“深开沟，勤培土”。随着向上生长，需多次将泥土培到葱白处（不埋过葱心），使葱白在无光条件下软化变长。',
        pruning_image: 'images/stages/greenonion_hilling_v3.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/greenonion_v3_stage_1_1779711395154.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/greenonion_v3_stage_2_1779711410876.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/greenonion_v3_stage_3_1779711423569.png', days: 20, gdd: 300  },
      { name: '展叶', image: 'images/greenonion_v3_stage_4_1779711436693.png', days: 15, gdd: 225  },
      { name: '培土', image: 'images/greenonion_v3_stage_5_1779711450339.png', days: 10, gdd: 150  },
      { name: '伸长', image: 'images/greenonion_v3_stage_6.png', days: 20, gdd: 300  },
      { name: '收获', image: 'images/greenonion_v3_stage_7.png', days: 15, gdd: 225  }
    ],
    pests: [
            {
                name: '葱蛆',
                cause: '暂无详细原因，建议保持通风透光，合理轮作。',
                prevention: '施用腐熟有机肥，播种前撒施草木灰，避免招惹种蝇产卵。',
                image: 'images/pest_garlic_maggot.png'
            },
            {
                name: '蓟马',
                cause: '在温暖干旱季节高发，喜欢隐藏在花朵或幼嫩组织内锉吸汁液。',
                prevention: '悬挂蓝板诱杀，干旱时注意浇水增加空气湿度，喷洒多杀菌素(生物制剂)。',
                image: 'images/pest_thrips.png'
            },
            {
                name: '紫斑病',
                cause: '温暖高湿天气易发，尤其是在葱蒜类作物生长衰弱或有蓟马危害造成伤口时。',
                prevention: '实行轮作，发现病叶及时掐除，喷施有机杀菌剂。',
                image: 'images/pest_garlic_purpleblotch.png'
            },
            {
                name: '霜霉病',
                cause: '低温、高湿（连续阴雨、结露）是诱发的主因，病菌借风雨传播。',
                prevention: '避免密植，降低田间湿度，发病初期喷洒波尔多液或枯草芽孢杆菌。',
                image: 'images/pest_cucumber_downy_mildew.png'
            },
            {
                name: '斑潜蝇',
                cause: '成虫在叶片组织内产卵，幼虫孵化后在叶肉内潜食，形成白色弯曲虫道。',
                prevention: '挂黄板诱杀，严重时喷涂印楝素。',
                image: 'images/pest_tomato_leafminer.png'
            }
        ]
  },
  {
    id: 'everbearing_strawberry',
    avatar: 'assets/icons/icon_everbearing_strawberry.png',
    name: '四季草莓',
    baseTemp: 12, categoryId: 'fruit',
    icon: '🍓',
    image: 'images/main_everbearing_strawberry.png',
    description: '日照中性草莓，只要温度合适（15-25℃）就可以在春、夏、秋季连续不断地开花结果。不仅产量稳定，更能在很长的一段时间内源源不断地提供鲜果，非常适合阳台或庭院种植。',
    calendar: {
      north: '3-10月',
      south: '全年均可（夏季需遮阴）',
      east: '2-11月',
      southwest: '全年均可',
      northwest: '4-10月'
    },
    stages: [
      {
        name: '幼苗期 (定植)',
        water_fertilizer: '底肥需充足，定植后浇透定根水。',
        pest_management: '防范根腐病、红蜘蛛。',
        pruning_trellising: '选择疏松透气的营养土定植，“深不埋心，浅不露根”。',
        image: null
      },
      {
        name: '营养生长与抽蔓期',
        water_fertilizer: '温度在 10-30℃ 之间持续生长，需保持土壤湿润，见干见湿。',
        pest_management: '注意通风，防范白粉病、蚜虫。',
        pruning_trellising: '及时剪除老叶、病叶以及不需要繁殖的匍匐茎。',
        image: null
      },
      {
        name: '连续开花结果期',
        water_fertilizer: '因为它是“劳模”，一直结果一直消耗养分，必须“薄肥勤施”：每隔10-15天浇一次稀薄的有机钾肥或酵素水。',
        water_image: 'images/stage_eb_strawberry_harvest.png',
        pest_management: '花果同株期需重点防范灰霉病，注意疏苗通风。',
        pruning_trellising: '为了保证果大味甜，建议每株同时保留 2-3 个健壮的花序，太小太弱的花蕾狠心摘除。理顺果穗，避免果实接触泥土。',
        pruning_image: 'images/stage_eb_strawberry_flower.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/everbearing_strawberry_v3_stage_1_1779710841859.png', days: 7, gdd: 105  },
      { name: '出苗', image: 'images/everbearing_strawberry_v3_stage_2_1779710854016.png', days: 7, gdd: 105  },
      { name: '幼苗', image: 'images/everbearing_strawberry_v3_stage_3_1779710866404.png', days: 20, gdd: 300  },
      { name: '展叶', image: 'images/everbearing_strawberry_v3_stage_4_1779710879583.png', days: 15, gdd: 225  },
      { name: '开花', image: 'images/everbearing_strawberry_v3_stage_5_1779710895334.png', days: 15, gdd: 225  },
      { name: '结果', image: 'images/everbearing_strawberry_v3_stage_6_1779710908481.png', days: 25, gdd: 375  },
      { name: '采收', image: 'images/everbearing_strawberry_v3_stage_7_1779710924843.png', days: 10, gdd: 150  }
    ],
    pests: [
      {
        name: '红蜘蛛',
        cause: '高温干旱时极易爆发，肉眼可见叶片背面有微小红点和丝网。',
        prevention: '增加环境湿度，经常用清水喷淋叶片背面；严重时可喷洒苦参碱或矿物油。'
      }
    ]
  }
,
  // ================= 补充的新增蔬菜 =================
  {
    id: 'napacabbage',
    avatar: 'assets/icons/icon_napacabbage.png',
    name: '大白菜',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🥬',
    image: 'images/crop_napacabbage.png',
    description: '北方冬储菜主力，生长周期长，包心紧实。',
    calendar: { north: '秋季', south: '秋冬季', east: '秋季', southwest: '秋冬季', northwest: '秋季' },
    stages: [
      { name: '莲座期追肥', content: '莲座期是大白菜外叶生长高峰，需要大量氮肥，应重施一次“发棵肥”。', image: 'images/stages/napacabbage_fertilize_v3.png' },
      { name: '结球期水肥', content: '进入结球期，需水量极大，必须保持土壤湿润，并增施钾肥促进叶片紧实。', image: 'images/stages/napacabbage_water_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/napacabbage_stage_1.png', days: 5, gdd: 80 },
      { name: '出苗', image: 'images/napacabbage_stage_2.png', days: 5, gdd: 80 },
      { name: '幼苗', image: 'images/napacabbage_stage_3.png', days: 15, gdd: 220 },
      { name: '莲座', image: 'images/napacabbage_stage_4.png', days: 20, gdd: 300 },
      { name: '结球', image: 'images/napacabbage_stage_5.png', days: 25, gdd: 350 },
      { name: '采收', image: 'images/napacabbage_stage_6.png', days: 10, gdd: 100 }
    ],
    pests: [
      { name: '菜青虫', cause: '十字花科专属性害虫，啃食叶片。', prevention: '使用防虫网，发现卵块及时捏死，喷洒苏云金杆菌（Bt）。', image: 'images/pest_cabbage_caterpillar.png' },
      { name: '软腐病', cause: '高温高湿且有伤口时极易感染，散发恶臭。', prevention: '高垄栽培，避免大水漫灌，及时拔除病株并撒生石灰消毒。', image: 'images/pest_soft_rot.png' }
    ]
  },
  {
    id: 'bokchoy',
    name: '小白菜/上海青',
    baseTemp: 5, categoryId: 'leafy',
    icon: '🥬',
    avatar: 'assets/icons/icon_bokchoy.png',
    image: 'images/crop_bokchoy.png',
    description: '南方四季常青，生长迅速，叶柄宽厚肥嫩。',
    calendar: { north: '春夏秋', south: '全年', east: '春夏秋', southwest: '全年', northwest: '春秋' },
    stages: [
      { name: '间苗', content: '播种出苗后，由于苗密争抢养分，需及时间苗，保持合理的株距。', image: 'images/stages/bokchoy_thinning_v3.png' },
      { name: '追施速效氮', content: '小白菜生长期短，以营养生长为主，需在3-4片真叶时追施一次速效氮肥。', image: 'images/stages/bokchoy_fertilize_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/bokchoy_stage_1.png', days: 3, gdd: 50 },
      { name: '出苗', image: 'images/bokchoy_stage_2.png', days: 4, gdd: 60 },
      { name: '幼苗', image: 'images/bokchoy_stage_3.png', days: 10, gdd: 150 },
      { name: '旺盛生长', image: 'images/bokchoy_stage_4.png', days: 15, gdd: 200 },
      { name: '采收', image: 'images/bokchoy_stage_5.png', days: 10, gdd: 120 }
    ],
    pests: [
      { name: '黄条跳甲', cause: '喜欢干燥温暖环境，啃食叶片成无数小孔。', prevention: '保持土壤湿润，铺设银灰地膜驱避。', image: 'images/pest_flea_beetle.png' },
      { name: '霜霉病', cause: '低温高湿环境下易发病，叶背产生霜状霉层。', prevention: '增加通风透光，降低湿度。', image: 'images/pest_downy_mildew.png' }
    ]
  },
  {
    id: 'spinach',
    avatar: 'assets/icons/icon_spinach.png',
    name: '菠菜',
    baseTemp: 2, categoryId: 'leafy',
    icon: '🥬',
    image: 'images/crop_spinach.png',
    description: '极耐寒的绿叶菜，富含铁元素，喜冷凉。',
    calendar: { north: '春秋', south: '秋冬', east: '秋冬', southwest: '秋冬', northwest: '春秋' },
    stages: [
      { name: '浸种催芽', content: '菠菜种子果皮坚硬，播前最好浸种12-24小时，放于冷凉处催芽。', image: 'images/stages/spinach_seed_soak_v3.png' },
      { name: '防抽薹', content: '春季栽培遇到长日照和高温易抽薹开花，需选择耐抽薹品种并及时采收。', image: 'images/stages/spinach_harvest_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/spinach_stage_1.png', days: 7, gdd: 70 },
      { name: '出苗', image: 'images/spinach_stage_2.png', days: 7, gdd: 70 },
      { name: '真叶期', image: 'images/spinach_stage_3.png', days: 15, gdd: 150 },
      { name: '叶片膨大', image: 'images/spinach_stage_4.png', days: 15, gdd: 150 },
      { name: '采收', image: 'images/spinach_stage_5.png', days: 10, gdd: 100 }
    ],
    pests: [
      { name: '潜叶蝇', cause: '幼虫潜入叶片内部取食，留下白色不规则虫道。', prevention: '挂黄板诱杀成虫，发现虫道及早摘除病叶。', image: 'images/pest_leafminer.png' }
    ]
  },
  {
    id: 'lettuce',
    avatar: 'assets/icons/icon_lettuce.png',
    name: '生菜/莴笋',
    baseTemp: 4, categoryId: 'leafy',
    icon: '🥬',
    image: 'images/crop_lettuce.png',
    description: '菊科蔬菜，生菜食叶，莴笋食茎，喜冷凉忌高温。',
    calendar: { north: '春秋', south: '秋冬', east: '春秋', southwest: '四季', northwest: '春秋' },
    stages: [
      { name: '浅播喜光', content: '莴苣类种子发芽需光，播种后只需覆盖极薄的一层土或不覆土。', image: 'images/stages/lettuce_surface_sow_v3.png' },
      { name: '防高温抽薹', content: '生长后期遇到高温易导致茎秆拔高开花（抽薹）或产生苦味。', image: 'images/stages/lettuce_harvest_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/lettuce_stage_1.png', days: 4, gdd: 60 },
      { name: '出苗', image: 'images/lettuce_stage_2.png', days: 6, gdd: 90 },
      { name: '幼苗', image: 'images/lettuce_stage_3.png', days: 15, gdd: 200 },
      { name: '发棵/肉质茎膨大', image: 'images/lettuce_stage_4.png', days: 20, gdd: 300 },
      { name: '采收', image: 'images/lettuce_stage_5.png', days: 15, gdd: 200 }
    ],
    pests: [
      { name: '蚜虫', cause: '干旱温暖易爆发，吸食幼嫩汁液。', prevention: '黄板诱杀，喷施吡虫啉。', image: 'images/pest_aphid.png' },
      { name: '霜霉病', cause: '高湿阴冷环境。', prevention: '通风降湿。', image: 'images/pest_downy_mildew.png' }
    ]
  },
  {
    id: 'celery',
    name: '芹菜',
    baseTemp: 4, categoryId: 'leafy',
    icon: '🥬',
    avatar: 'assets/icons/icon_celery.png',
    image: 'images/crop_celery.png',
    description: '伞形科蔬菜，带有特殊芳香，喜冷凉湿润。',
    calendar: { north: '春秋', south: '秋冬', east: '秋冬', southwest: '四季', northwest: '春秋' },
    stages: [
      { name: '缓慢发芽', content: '芹菜种子小且发芽极慢，出苗前需始终保持土壤湿润，可覆盖遮阳网保墒。', image: 'images/stages/celery_shade_v3.png' },
      { name: '防空心', content: '缺水缺肥或过晚采收会导致茎秆空心，纤维增多，失去食用价值。', image: 'images/stages/celery_water_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/celery_stage_1.png', days: 10, gdd: 120 },
      { name: '出苗', image: 'images/celery_stage_2.png', days: 10, gdd: 120 },
      { name: '幼苗', image: 'images/celery_stage_3.png', days: 25, gdd: 300 },
      { name: '心叶生长期', image: 'images/celery_stage_4.png', days: 30, gdd: 400 },
      { name: '采收', image: 'images/celery_stage_5.png', days: 15, gdd: 150 }
    ],
    pests: [
      { name: '斑枯病', cause: '高温高湿导致叶片出现病斑。', prevention: '合理密植，改善通风，轮作。', image: 'images/pest_garlic_purpleblotch.png' }
    ]
  },
  {
    id: 'coriander',
    name: '香菜/芫荽',
    baseTemp: 3, categoryId: 'leafy',
    icon: '🌿',
    avatar: 'assets/icons/icon_coriander.png',
    image: 'images/crop_coriander.png',
    description: '带有特殊香气的提味蔬菜，喜冷凉，不耐热。',
    calendar: { north: '春秋', south: '秋冬', east: '春秋', southwest: '四季', northwest: '春秋' },
    stages: [
      { name: '搓外壳', content: '香菜种子外包着一层坚硬的壳（实为果实），播种前需将双圆半球的壳搓开，发芽率才高。', image: 'images/stages/coriander_seed_crush_v3.png' },
      { name: '防高温', content: '气温超过30℃时生长极度缓慢，极易直接抽薹开花。', image: 'images/stages/coriander_harvest_v3.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/coriander_stage_1.png', days: 10, gdd: 120 },
      { name: '出苗', image: 'images/coriander_stage_2.png', days: 7, gdd: 90 },
      { name: '幼叶展开', image: 'images/coriander_stage_3.png', days: 15, gdd: 180 },
      { name: '旺盛生长', image: 'images/coriander_stage_4.png', days: 20, gdd: 250 },
      { name: '采收', image: 'images/coriander_stage_5.png', days: 10, gdd: 120 }
    ],
    pests: [
      { name: '极少病虫害', cause: '因其带有强烈气味，天然具有驱虫效果。', prevention: '正常田间管理即可，适合作为伴生植物。', image: 'images/pest_none.png' }
    ]
  },
  {
    id: 'corn',
    name: '玉米',
    baseTemp: 10, categoryId: 'fruit',
    icon: '🌽',
    avatar: 'assets/icons/icon_corn.png',
    image: 'images/crop_corn.png',
    description: '喜温喜光的禾本科作物，甜玉米/糯玉米风味极佳。',
    calendar: { north: '春夏季', south: '春夏秋', east: '春夏季', southwest: '春夏', northwest: '春季' },
    stages: [
      {
        name: '苗期',
        water_fertilizer: '播种后保持土壤湿润。出苗后至拔节前，控制浇水，促根下扎。',
        pest_management: '防范地老虎、蝼蛄等地下害虫。',
        pruning_trellising: '应呈方阵式多行种植（而非单行），利于后期集中授粉。',
        image: null
      },
      {
        name: '拔节孕穗期 (大喇叭口期)',
        water_fertilizer: '当长到第11-12片叶时（顶部呈喇叭口状），是需水需肥高峰期，需重施氮肥，并充足浇水。',
        water_image: 'images/stages/corn_fertilize_v3.png',
        pest_management: '玉米螟幼虫极易钻入心叶啃食，需在大喇叭口期向心叶内撒施Bt颗粒剂防治。',
        pruning_trellising: null
      },
      {
        name: '抽雄开花与灌浆期',
        water_fertilizer: '保持土壤湿润，不可缺水，防止花粉枯萎或灌浆不足。后期防涝。',
        pest_management: '防范黏虫、草地贪夜蛾。',
        pruning_trellising: '玉米靠风力授粉，方阵种植下微风吹过雄花花粉能顺利落在果穗花丝上。如遇连续阴雨，可进行人工辅助授粉。',
        pruning_image: 'images/stages/corn_pollinate_v3.png'
      }
    ],
    growthSequence: [
      { name: '种子', image: 'images/corn_stage_1.png', days: 5, gdd: 75 },
      { name: '出苗', image: 'images/corn_stage_2.png', days: 7, gdd: 100 },
      { name: '拔节期', image: 'images/corn_stage_3.png', days: 20, gdd: 350 },
      { name: '抽穗开花', image: 'images/corn_stage_4.png', days: 15, gdd: 250 },
      { name: '灌浆期', image: 'images/corn_stage_5.png', days: 20, gdd: 300 },
      { name: '成熟采收', image: 'images/corn_stage_6.png', days: 10, gdd: 150 }
    ],
    pests: [
      { name: '玉米螟', cause: '幼虫钻入心叶或茎秆、果穗中啃食。', prevention: '在大喇叭口期向心叶内撒施Bt颗粒剂。', image: 'images/pest_corn_borer.png' },
      { name: '草地贪夜蛾', cause: '暴食性害虫，食量惊人。', prevention: '利用性诱剂诱杀成虫，尽早喷施生物农药。', image: 'images/pest_fall_armyworm.png' }
    ]
  },
  {
    id: 'edamame',
    name: '毛豆/大豆',
    baseTemp: 10, categoryId: 'legumes',
    icon: '🫘',
    avatar: 'assets/icons/icon_edamame.png',
    image: 'images/crop_edamame.png',
    description: '营养丰富的豆类，根系有根瘤菌可固氮。',
    calendar: { north: '春夏季', south: '春夏秋', east: '春夏季', southwest: '春夏', northwest: '春季' },
    stages: [
      { name: '根瘤固氮', content: '毛豆根部有根瘤菌共生，能将空气中的氮转化为氮肥。因此前期少施氮肥，多施磷钾肥。', image: 'images/stages/edamame_0.png' },
      { name: '鼓粒期水肥', content: '开花结荚后进入鼓粒期，此时是决定产量的关键，需保证水分充足，防止落花落荚。', image: 'images/stages/edamame_1.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/edamame_stage_1.png', days: 6, gdd: 90 },
      { name: '出苗', image: 'images/edamame_stage_2.png', days: 8, gdd: 120 },
      { name: '分枝期', image: 'images/edamame_stage_3.png', days: 20, gdd: 300 },
      { name: '开花结荚', image: 'images/edamame_stage_4.png', days: 15, gdd: 225 },
      { name: '鼓粒期', image: 'images/edamame_stage_5.png', days: 20, gdd: 300 },
      { name: '青荚采收', image: 'images/edamame_stage_6.png', days: 10, gdd: 150 }
    ],
    pests: [
      { name: '豆荚螟', cause: '幼虫钻入豆荚内啃食豆粒。', prevention: '在开花结荚期及时喷药防治。', image: 'images/pest_pod_borer.png' }
    ]
  },
  {
    id: 'pea',
    name: '豌豆',
    baseTemp: 3, categoryId: 'legumes',
    icon: '🫛',
    avatar: 'assets/icons/icon_pea.png',
    image: 'images/crop_pea.png',
    description: '喜冷凉的攀缘豆类，可食豆粒或嫩荚。',
    calendar: { north: '春季', south: '秋冬季', east: '秋冬季', southwest: '秋冬季', northwest: '春季' },
    stages: [
      { name: '搭架引蔓', content: '蔓生豌豆长至20厘米时，需搭设树枝或网架供其攀爬，保证通风透光。', image: 'images/stages/pea_0.png' },
      { name: '忌连作', content: '豌豆根系分泌物对自身有毒害，必须实行3-4年轮作，不可重茬。', image: 'images/stages/pea_1.png' }
    ],
    growthSequence: [
      { name: '种子', image: 'images/pea_stage_1.png', days: 7, gdd: 70 },
      { name: '出苗', image: 'images/pea_stage_2.png', days: 10, gdd: 100 },
      { name: '抽蔓分枝', image: 'images/pea_stage_3.png', days: 25, gdd: 250 },
      { name: '开花', image: 'images/pea_stage_4.png', days: 15, gdd: 150 },
      { name: '结荚鼓粒', image: 'images/pea_stage_5.png', days: 20, gdd: 200 },
      { name: '采收', image: 'images/pea_stage_6.png', days: 10, gdd: 100 }
    ],
    pests: [
      { name: '潜叶蝇', cause: '早春高发，幼虫钻入叶片啃食。', prevention: '黄板诱杀，摘除带虫道的叶片。', image: 'images/pest_leafminer.png' },
      { name: '白粉病', cause: '生长中后期通风不良时易发。', prevention: '加强通风，喷施硫磺或粉锈宁。', image: 'images/pest_powdery_mildew.png' }
    ]
  },
  {
    id: 'taro',
    name: '芋头',
    baseTemp: 13, categoryId: 'root',
    icon: '🥔',
    avatar: 'assets/icons/icon_taro.png',
    image: 'images/crop_taro.png',
    description: '喜高温高湿的根茎类蔬菜，极不耐旱。',
    calendar: { north: '春夏季', south: '春夏季', east: '春夏季', southwest: '春夏', northwest: '不宜种植' },
    stages: [
      { name: '多水栽培', content: '芋头是名副其实的“水货”，生长旺盛期需要充足甚至积水的环境，不可缺水。', image: 'images/stages/taro_0.png' },
      { name: '培土长芋', content: '地上叶片长出后，地下球茎开始膨大，需多次培土以利于块茎膨大并防止露出水面变绿。', image: 'images/stages/taro_1.png' }
    ],
    growthSequence: [
      { name: '种芋', image: 'images/taro_stage_1.png', days: 15, gdd: 200 },
      { name: '发芽出苗', image: 'images/taro_stage_2.png', days: 15, gdd: 250 },
      { name: '展叶期', image: 'images/taro_stage_3.png', days: 30, gdd: 450 },
      { name: '球茎膨大', image: 'images/taro_stage_4.png', days: 40, gdd: 700 },
      { name: '成熟采收', image: 'images/taro_stage_5.png', days: 20, gdd: 250 }
    ],
    pests: [
      { name: '斜纹夜蛾', cause: '暴食性害虫，幼虫群集啃食叶片。', prevention: '发现卵块或初孵幼虫及时摘除叶片销毁。', image: 'images/pest_cabbage_caterpillar.png' },
      { name: '疫病', cause: '高温多雨季节爆发，导致叶片腐烂。', prevention: '雨后注意排水防渍，喷施杀菌剂。', image: 'images/pest_tomato_blight.png' }
    ]
  },
];

export const fertilizers = [
  {
    id: 'eco_enzyme',
    name: '环保酵素',
    baseTemp: 10, categoryId: 'liquid_fertilizer',
    icon: '🧪',
    image: 'images/eco_enzyme.png',
    description: '利用鲜垃圾发酵而成的全能营养液，能有效改良土壤、促进生根并抑制病菌。',
    calendar: {
      default: '全年均可制作，夏季发酵快（约3个月），冬季发酵慢（约6个月）。'
    },
    stages: [
      { name: '准备材料', content: '黄金比例 1:3:10 ➡️ 1份红糖 : 3份鲜果皮/菜叶 : 10份清水。准备一个可密封的塑料大桶（勿用玻璃瓶以免发酵胀气爆裂）。', image: 'images/enz_step1_v2.png' },
      { name: '混合装桶', content: '将红糖溶于水中，放入切碎的果皮菜叶。容器内需预留 20% 的空间给发酵产生的气体。', image: 'images/enz_step2_v2.png' },
      { name: '发酵放气', content: '第一个月发酵最剧烈，需每天拧松瓶盖放气一次（闻到酒香或微酸味属正常）。', image: 'images/enz_step3_v2.png' },
      { name: '静置熟成', content: '第二、三个月可盖紧密封静置。三个月后，液体呈棕黄色、散发清香酸气即为发酵成功。若发黑发臭则为失败，需补充红糖重新发酵。', image: 'images/enz_step4_v2.png' },
      { name: '稀释使用 🌟', content: '【日常浇水】：1:1000 比例稀释；【叶面喷施】：1:500 比例稀释（防病虫害）；【土壤改良】：直接浇灌土壤底肥。', image: 'images/enz_step5_v2.png' }
    ]
  },
  {
    id: 'aerobic_compost',
    name: '有机耗氧堆肥',
    baseTemp: 10, categoryId: 'solid_fertilizer',
    icon: '🍂',
    image: 'images/aerobic_compost.png',
    description: '模拟自然界的落叶归根过程，将有机废弃物转化为富含腐殖质的极品“黑金土”。',
    calendar: {
      default: '春、夏、秋季最佳（温度高于20℃时发酵极快）。'
    },
    stages: [
      { name: '准备材料', content: '需要“绿料”（富含氮：如鲜菜叶、青草、咖啡渣，占比约1/3）和“褐料”（富含碳：如干树叶、枯草、碎纸板，占比约2/3），以及少量普通泥土作为菌种。', image: 'images/comp_step1_1779289874567.png' },
      { name: '常见粪肥底料 (进阶)', content: '进阶玩家可以使用动物粪便（图示：鸡粪、羊粪、牛粪）或酒糟混合物等作为高含氮量的“绿料”替代品发酵，肥效极猛。注意：纯粪料发酵极易发臭，必须掺杂等体积以上的稻壳、锯末或枯草等“褐料”来调节碳氮比！', image: 'images/mat_combined.png' },
      { name: '三明治叠放法', content: '底层铺10cm褐料垫底透气 ➡️ 撒一层绿料 ➡️ 撒一层薄土 ➡️ 再盖一层褐料。像做三明治一样层层堆叠，至少堆叠4到5组以上直至堆满，最上层务必用褐料或泥土封顶防虫。', image: 'images/comp_step2_v5.png' },
      { name: '水分控制', content: '加水至堆肥材料“湿润但捏不出水滴”的状态（含水量约50-60%）。太干不发酵，太湿会发臭。', image: 'images/comp_step3_1779289907283.png' },
      { name: '翻堆与供氧', content: '耗氧发酵需要氧气。每隔3-5天，用铁铲或叉子将底部和内部的材料翻到表面。翻堆时若中心温度达到50-60℃，说明发酵非常成功！', image: 'images/comp_step4_1779289922090.png' },
      { name: '熟成与使用 🌟', content: '约1-2个月后，堆肥体积缩小一半，不再发热，变成黑褐色且散发泥土清香，即可作为极品底肥拌入土壤中使用。', image: 'images/comp_step5_1779289937708.png' }
    ]
  },
  {
    id: 'vermicompost',
    name: '有机蚯蚓粪',
    baseTemp: 10, categoryId: 'solid_fertilizer',
    icon: '🪱',
    image: 'images/verm_main.png',
    description: '利用红蚯蚓消化厨余垃圾产生的“黑金”，是最天然、温和且富含微生物的有益基肥。<br><br>💡 <b>多层箱运作原理（新手必读）：</b><br>多层饲养箱的每一层底部都布满小孔。当底层厨余被吃完且上面一层放入新鲜食物时，蚯蚓会基于“向上觅食”的本能，通过小孔自动爬向上一层。这样不仅免去了人工分离蚯蚓的麻烦，还实现了极具巧思的“无接触式”自动收肥。',
    calendar: {
      default: '全年均可（室内或阴凉处养殖，蚯蚓适宜温度为15-25℃）。'
    },
    stages: [
      { name: '准备饲养箱', content: '准备一个透气的多层饲养箱（带沥水层）。底层铺上湿润的椰糠、撕碎的硬纸板或报纸作为垫料。', image: 'images/verm_step1.png' },
      { name: '投放蚯蚓', content: '放入适合堆肥的红蚯蚓（如太平2号红蚯蚓或Red wigglers）。不要使用普通菜园挖来的野生大蚯蚓。', image: 'images/verm_step2.png' },
      { name: '投喂厨余', content: '定期投入果皮、菜叶、咖啡渣等切碎的素食厨余（切忌投入肉类、油脂或柑橘类）。表面覆盖一层薄土或纸片以防飞虫。', image: 'images/verm_step3.png' },
      { name: '收获纯肥与“蚯蚓茶” 🌟', content: '几个月后，底层会充满黑褐色无异味的“泥土”——蚯蚓粪，可直接拌入土中作极品底肥。<br><br>💧 <b>高阶副产物“蚯蚓茶”：</b><br>从底部水龙头接出的浓缩渗液被称为“蚯蚓茶”，它是极佳的速效液体肥，富含有益微生物。<b>用法：</b>必须按 1:10 兑水稀释，用于日常浇根或叶面喷施，能显著增强叶片抗病驱虫能力！', image: 'images/verm_step4.png' }
    ]
  }
];

// ================= 生态植保工坊 =================
export const pestControls = [
  // 1
  {
    id: 'pc_sticky_trap',
    name: '黄板/蓝板诱杀',
    baseTemp: 10, categoryId: 'physical',
    icon: '🟨',
    image: 'images/main_pest_sticky_trap.png',
    description: '基础物理防护。利用昆虫的趋黄性（蚜虫、白粉虱、潜叶蝇）或趋蓝性（蓟马）进行物理粘捕，完全无毒无害。',
    stages: [
      { name: '准备与悬挂', content: '购买双面涂胶的黄板或蓝板。在作物上方10-15厘米处悬挂，随着植株长高而随时调整高度。' },
      { name: '后期维护', content: '当粘虫板表面粘满害虫或失去粘性时，及时更换。' }
    ]
  },
  // 2
  {
    id: 'pc_insect_net',
    name: '防虫网隔离',
    baseTemp: 10, categoryId: 'physical',
    icon: '🕸️',
    image: 'images/main_pest_insect_net.png',
    description: '最直接的物理护盾。覆盖细密网眼的防虫网，能有效阻挡菜青虫（蝴蝶）、跳甲成虫等飞虫产卵。',
    stages: [
      { name: '搭建骨架', content: '使用竹片、PVC管或铁丝在菜床上方弯成拱形骨架。' },
      { name: '覆盖与固定', content: '将防虫网（一般推荐40-60目）严密覆盖在骨架上，四周必须用泥土或砖块压紧，不留任何缝隙。' }
    ]
  },
  // 3
  {
    id: 'pc_sugar_trap',
    name: '糖醋酒液诱杀',
    baseTemp: 10, categoryId: 'physical',
    icon: '🍶',
    image: 'images/main_pest_sugar_trap.png',
    description: '自制酸甜陷阱。利用某些害虫（如果蝇、夜蛾类成虫、地老虎）对糖醋气味的偏好进行诱杀。',
    stages: [
      { name: '调配诱剂', content: '按照糖:醋:酒:水 = 3:4:1:2 的比例混合，可滴入2滴洗洁精破坏水面张力。' },
      { name: '放置陷阱', content: '将混合液倒入浅盆或矿泉水瓶下半截中，悬挂或放置在作物附近，定期清理死虫并补充液体。' }
    ]
  },
  // 4
  {
    id: 'pc_chili_garlic',
    name: '辣椒大蒜水',
    baseTemp: 10, categoryId: 'homemade',
    icon: '🌶️',
    image: 'images/main_pest_chili_garlic_spray.png',
    description: '强刺激性气味驱避。大蒜中的大蒜素和辣椒中的辣椒素能有效驱赶蚜虫、红蜘蛛幼虫等软体害虫。',
    stages: [
      { name: '捣碎与浸泡', content: '取大蒜50g、朝天椒50g，捣烂成泥。加入1升清水浸泡24小时。' },
      { name: '过滤与喷洒', content: '用纱布过滤掉残渣（防止堵塞喷壶）。加入几滴洗洁精（增加附着力），在傍晚均匀喷洒在植物叶片正反面。' }
    ]
  },
  // 5
  {
    id: 'pc_wood_ash',
    name: '草木灰撒施与水剂',
    baseTemp: 10, categoryId: 'homemade',
    icon: '🪵',
    image: 'images/main_pest_wood_ash.png',
    description: '强碱性杀菌防虫兼补钾。草木灰不仅是优质钾肥，其碱性还能抑制真菌（如灰霉病、根腐病），并能阻挡蜗牛爬行。',
    stages: [
      { name: '干撒防虫', content: '在干燥的天气，将草木灰撒在蔬菜根部周围的土壤表面，能有效防止蜗牛和鼻涕虫靠近。' },
      { name: '浸水喷洒', content: '取草木灰1份加水5份，浸泡24小时后取上清液。喷洒在叶面可防治蚜虫，并兼作叶面肥。' }
    ]
  },
  // 6
  {
    id: 'pc_soap_spray',
    name: '洗衣粉/皂液水',
    baseTemp: 10, categoryId: 'homemade',
    icon: '🧼',
    image: 'images/main_pest_soap_spray.png',
    description: '触杀型物理封堵气孔。肥皂水或洗洁精水可以溶解害虫体表的蜡质层，并堵塞气孔导致其窒息死亡。专治蚜虫、介壳虫、红蜘蛛。',
    stages: [
      { name: '配制皂液', content: '取中性肥皂液（最好是纯天然橄榄油皂液）或无残留洗洁精，按 1:300 的比例兑水。' },
      { name: '喷洒与冲洗', content: '针对虫害密集处（多在叶背面）直接喷洒。<b>非常重要：</b>喷洒后1-2小时，必须用清水把植物叶片重新冲洗干净，避免皂液烧伤叶片！' }
    ]
  },
  // 7
  {
    id: 'pc_matrine',
    name: '苦参碱',
    baseTemp: 10, categoryId: 'extract',
    icon: '🌿',
    image: 'images/main_pest_matrine.png',
    description: '广谱天然植物杀虫剂。从豆科植物苦参中提取的生物碱，对害虫具有触杀和胃毒作用，对菜青虫、蚜虫效果显著，且在自然界易降解。',
    stages: [
      { name: '按比例稀释', content: '购买0.3%或更高浓度的苦参碱水剂，按照说明书要求的倍数（通常为500-1000倍）兑水。' },
      { name: '喷洒时机', content: '在害虫低龄幼虫期施药效果最好。应在傍晚或阴天喷洒，避免强光分解药效。' }
    ]
  },
  // 8
  {
    id: 'pc_neem_oil',
    name: '印楝素',
    baseTemp: 10, categoryId: 'extract',
    icon: '🫒',
    image: 'images/main_pest_neem_oil.png',
    description: '强大的昆虫生长调节剂与拒食剂。从印楝树种子中提取，不会立刻杀死成虫，但能破坏其交配和蜕皮，并使它们绝食。对极多顽固虫害均有抑制作用。',
    stages: [
      { name: '乳化与稀释', content: '纯冷压印楝油在冷水中不溶。需先在温水中加入少许肥皂液或洗洁精作为乳化剂，再加入印楝油搅拌均匀，稀释至约 1:200。' },
      { name: '预防为主', content: '印楝素更偏向于预防和长期控制。每隔7-10天喷洒一次全株，可长效保护植物。' }
    ]
  },
  // 9
  {
    id: 'pc_bt',
    name: '苏云金杆菌 (Bt)',
    baseTemp: 10, categoryId: 'biological',
    icon: '🦠',
    image: 'images/main_pest_bt.png',
    description: '专杀鳞翅目幼虫的“细菌杀手”。这种神奇的细菌被菜青虫、吊丝虫吃下后，会在其肠道内释放毒素导致虫子肠穿孔死亡，但对人畜、蜜蜂绝对安全！',
    stages: [
      { name: '兑水喷洒', content: '按照说明书比例稀释 Bt 粉剂或水剂。必须均匀喷洒在叶片正反面（因为这是胃毒剂，必须让虫子吃下去才有效）。' },
      { name: '注意事项', content: 'Bt 见效较慢（虫子吃后停止进食，约2-3天才死亡）。怕紫外线，必须在傍晚或阴天施药；不能与杀菌剂混用。' }
    ]
  },
  // 10
  {
    id: 'pc_bacillus',
    name: '枯草芽孢杆菌',
    baseTemp: 10, categoryId: 'biological',
    icon: '🧫',
    image: 'images/main_pest_bacillus.png',
    description: '以菌抑菌的防病先锋。在植物表面大量繁殖，通过“空间占位”和分泌抗菌物质，把有害病菌（白粉病、霜霉病、枯萎病）挤走或杀死。',
    stages: [
      { name: '提前接种预防', content: '在病害高发期到来前，将枯草芽孢杆菌稀释后喷洒叶面或灌根，让有益菌提前在植物上“安家”。' },
      { name: '安全无毒', content: '纯生物制剂，无安全间隔期，今天喷明天就能采摘吃。不能与铜制剂或其他杀菌剂混用。' }
    ]
  },
  // 11
  {
    id: 'pc_ladybug',
    name: '释放天敌昆虫',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🐞',
    image: 'images/main_pest_ladybug.png',
    description: '纯天然的“除虫雇佣兵”。通过购买和释放捕食螨（吃红蜘蛛）、异色瓢虫/草蛉（吃蚜虫）、赤眼蜂等天敌，建立微型生态平衡。',
    stages: [
      { name: '选购与释放', content: '确认你的主要虫害后购买对应的天敌。傍晚时分，在虫害集中的植物附近打开包装，让天敌自行爬出。' },
      { name: '保护天敌', content: '释放天敌后，绝对不能使用任何广谱杀虫剂。可以种植一些蜜源植物（如莳萝、香菜开花）为天敌提供花粉和花蜜，吸引它们留下来定居。' }
    ]
  },
  // 12
  {
    id: 'pc_companion_planting',
    name: '陪伴种植 (套种/混种)',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🌻',
    image: 'images/main_pest_companion_planting.png',
    description: '利用植物间的相生相克建立生态屏障。混种不同气味或根系分泌物的植物，可以迷惑害虫、驱避害虫或吸引益虫。',
    stages: [
      { name: '经典“三姐妹”混种 🌽', content: '<b>玉米 + 豆类 + 南瓜</b>：这是最经典的印第安套种智慧。玉米高秆为豆类提供攀爬支架；豆类根部根瘤菌固定空气中的氮元素，为系统提供天然氮肥；南瓜在底层匍匐生长，巨大的叶片覆盖土表，既能保水又能抑制杂草，还能防止水土流失。', image: 'images/comp_plant_threesisters.png' },
      { name: '气味驱避与隐蔽屏障 🌿', content: '<b>① 番茄 + 万寿菊</b>：万寿菊根系分泌的物质能有效杀灭土壤中的根结线虫，强烈的气味还能驱避白粉虱。<br><b>② 包菜/西兰花 + 芳香香草（薄荷/迷迭香/百里香）</b>：十字花科容易招惹菜粉蝶，香草的浓烈挥发油气味会干扰粉蝶的嗅觉，让它们找不到产卵目标。<br><b>③ 草莓/玫瑰 + 葱蒜类（大蒜/洋葱）</b>：葱蒜类散发的硫化物可以驱避蚜虫、红蜘蛛，还能预防真菌性病害。', image: 'images/comp_plant_marigold.png' },
      { name: '牺牲植物与陷阱诱饵 🪤', content: '<b>① 旱金莲 + 瓜果/茄科</b>：在菜地外围种一圈旱金莲，它们会像磁铁一样把附近的黑蚜虫全吸引过去，充当“人体盾牌”，从而保护了主栽蔬菜不受侵害。<br><b>② 芥菜 + 卷心菜</b>：黄条跳甲更喜欢吃芥菜，通过提前在边缘种一排芥菜，能将害虫引诱过去后集中消灭。', image: 'images/comp_plant_nasturtium.png' },
      { name: '招引益虫与传粉助手 🐝', content: '<b>① 伞形科香料（莳萝/香菜/茴香） + 各种蔬菜</b>：让香菜或莳萝开出细小的伞形白花，能吸引大量食蚜蝇、寄生蜂和瓢虫，它们会主动消灭菜地里的蚜虫和青虫。<br><b>② 琉璃苣 + 草莓/番茄/瓜类</b>：琉璃苣是顶级的蜜源植物，能吸引海量蜜蜂前来授粉，大幅提高果实产量，还能改善草莓的口感。', image: 'images/comp_plant_umbel.png' },
      { name: '促进生长与风味提升 🍅', content: '<b>① 番茄 + 罗勒</b>：经典的灵魂伴侣，同生同长。罗勒不仅能驱避番茄天蛾等害虫，根系的微环境互作还能让结出的番茄风味更加浓郁鲜甜。<br><b>② 土豆 + 辣根/万寿菊</b>：辣根可以提高土豆的抗病性，抵御马铃薯甲虫；万寿菊则防止地下害虫啃食薯块。', image: 'images/comp_plant_basil.png' },
      { name: '立体空间与遮阴互补 ⛅', content: '<b>高秆作物（玉米/向日葵/搭架番茄） + 喜阴矮秆叶菜（生菜/菠菜/香菜）</b>：在炎热的夏季，叶菜极易被晒伤或高温抽薹（开花变老）。高秆作物在中午时分为矮秆叶菜提供半遮阴环境，不仅延长了叶菜的采收期，还让同一块土地的产出翻倍。', image: 'images/comp_plant_shade.png' }
    ]
  }
];

export const farmingModels = [
  {
    id: 'model_permaculture',
    type: 'model',
    name: '朴门农学 (Permaculture)',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🏡',
    image: 'images/model_permaculture.png',
    description: '核心理念是“顺应自然而非对抗自然”。通过观察自然生态系统的运作方式，设计出具备高度多样性、自我循环、低维护的农业系统。',
    stages: [
       { name: '螺旋香草园 (Herb Spiral)', content: '利用石头堆砌成立体螺旋结构，在最小面积内创造不同微气候，顶部干旱阳光充足种迷迭香，底部阴凉湿润种薄荷。', image: 'images/permaculture_herb_spiral.png' },
       { name: '食物森林 (Food Forest)', content: '模仿森林的七层结构（高大乔木、矮树、灌木、草本、地被、根系、藤本），实现空间的极致利用和物种共生。', image: 'images/permaculture_food_forest.png' },
       { name: '锁水微地形 (Swales)', content: '沿等高线挖掘浅沟，用来拦截和蓄集雨水，沟旁种植树木，让水分缓慢渗入地下，防旱保水。', image: 'images/permaculture_swales.png' }
    ]
  },
  {
    id: 'model_notill',
    type: 'model',
    name: '免耕法 (No-Till Farming)',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🍂',
    image: 'images/model_notill.png',
    description: '联合国粮农组织(FAO)极力推广的保护性农业模式。核心是最大限度减少对土壤的物理翻耕，保护土壤微生物群落和结构。',
    stages: [
       { name: '永久覆盖物 (Mulching)', content: '利用秸秆、落叶、干草等永久覆盖土壤表面，防止水分蒸发，抑制杂草，并在腐烂后转化为有机质。', image: 'images/notill_mulching.png' },
       { name: '覆盖作物 (Cover Crops)', content: '在主粮作物收获后或行间种植豆科或禾本科植物（如紫云英、三叶草、黑麦），不以收获为目的，主要用于绿肥还田、固氮和固土。', image: 'images/notill_cover_crops.png' },
       { name: '免耕播种', content: '不需要深翻土地，直接在覆盖层下开一条窄缝播下种子，最大程度保持土壤原本的孔隙和蚯蚓通道。', image: 'images/notill_seeding.png' }
    ]
  },
  {
    id: 'model_biodynamic',
    type: 'model',
    name: '生物动力农法 (Biodynamic)',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🌙',
    image: 'images/model_biodynamic.png',
    description: '源于鲁道夫·斯坦纳，把整个农场视为一个独立的、自给自足的“生命体”，强调宇宙节律对植物生长的影响，是目前最高标准的有机认证体系之一(Demeter)。',
    stages: [
       { name: '生物动力配方 (BD Preparations)', content: '使用特定的天然配方（如牛角粪、牛角硅、蓍草、洋甘菊等）制作特殊的堆肥和喷洒剂，激发土壤和植物的活力。', image: 'images/biodynamic_prep.png' },
       { name: '遵循宇宙节律 (Lunar Calendar)', content: '根据月相、星座运行的规律来安排播种、修剪、采收等农事活动（如根日、叶日、花日、果日），顺应自然能量。', image: 'images/biodynamic_lunar.png' },
       { name: '农场闭环 (Closed Loop)', content: '极其强调农场内部的物质循环，饲料、肥料必须主要来源于农场自身，尽量不依赖外部购入。', image: 'images/biodynamic_loop.png' }
    ]
  },
  {
    id: 'model_aquaponics',
    type: 'model',
    name: '共生农业 (Integrated Farming)',
    baseTemp: 10, categoryId: 'ecology',
    icon: '🦆',
    image: 'images/model_aquaponics.png',
    description: '将动物养殖和植物种植在同一个空间内有机结合，利用物种间的互补关系，形成生态闭环，实现物质的循环利用。',
    stages: [
       { name: '鱼菜共生 (Aquaponics)', content: '将水产养殖与水培蔬菜结合。鱼类的排泄物在水中经过微生物分解转化为硝酸盐，成为蔬菜的天然营养液，蔬菜吸收养分的同时净化水质。', image: 'images/aquaponics_system.png' },
       { name: '稻鸭/稻鱼共作', content: '中国传统的农业智慧，在水稻田中养鸭或养鱼。鸭子和鱼吃杂草和害虫，其粪便肥田，且它们的活动能疏松土壤、增加水中溶氧量，稻田也为它们提供了遮蔽。', image: 'images/aquaponics_rice_duck.png' },
       { name: '林下养殖 (Silvopasture)', content: '在果园或树林下散养鸡鸭猪羊。家禽家畜吃林间虫草，粪便肥林，树木为动物提供果实和遮阴。', image: 'images/aquaponics_silvopasture.png' }
    ]
  },
  {
    id: 'pc_regenerative',
    name: '再生农业 (Regenerative)',
    type: 'model',
    icon: '🌱',
    image: 'images/model_regenerative.png',
    description: '旨在重建土壤有机质和恢复退化土壤生物多样性的整体农业系统。超越“可持续”，致力于让生态系统越变越好，是目前全球顶尖科研机构极力推崇的模式。',
    stages: [
       { name: '减少物理化学干扰', content: '结合免耕法，严格限制合成化肥和农药的使用，保护地下错综复杂的真菌菌根网络，主要依靠生物手段提供养分和控制病虫害。', image: 'images/regen_disturbance.png' },
       { name: '极度增加植物多样性', content: '采用复杂的轮作制度和多物种覆盖作物混合播种，用不同根系深度的植物在地下构建立体的碳封存网络，激活土壤微生物。', image: 'images/regen_diversity.png' },
       { name: '计划性适应性放牧', content: '模仿野生食草动物群的迁徙行为，让牲畜在小块土地上高密度采食、踩踏并留下粪便，然后迅速转移，给土地充分的恢复期，极大地加速土壤碳封存。', image: 'images/regen_grazing.png' }
    ]
  }
];
